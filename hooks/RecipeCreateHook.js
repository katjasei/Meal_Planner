import { useState, useContext } from 'react';
import validate from 'validate.js';
import validation from '../validators/Validation';
import mediaAPI from './ApiHooks';
import { RecipeContext } from '../context/RecipeContext';

const initialErrors = {
  recipeNameError: 'The recipe must have a name (max 35 characters)',
  instructionsError: 'Instructions minimum length is 10 characters'
};
const initialInputs = { recipeName: '', instructions: '' };

const useRecipeForm = () => {
  const { uploadRecipe, reloadRecipes } = mediaAPI();
  const [recipes, setRecipes] = useContext(RecipeContext);
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);

  const handleRecipeNameChange = (text) => {
    const recipeNameError = validator('recipe', text);
    setErrors((errors) => ({
      ...errors,
      recipeNameError: recipeNameError
    }));
    setInputs((inputs) => ({
      ...inputs,
      recipeName: text
    }));
  };

  const handleInstructionsChange = (text) => {
    const instructionsError = validator('instructions', text);
    setInputs((inputs) => ({
      ...inputs,
      instructions: text
    }));
    setErrors((errors) => ({
      ...errors,
      instructionsError: instructionsError
    }));
  };

  const clearInputs = (setFile) => {
    setInputs(initialInputs);
    setErrors(initialErrors);
    setFile(null);
  };

  const handleRecipeUpload = (file, ingredients, navigation, resetAll) => {
    const nutrientsObject = {
      protein: 0,
      carbs: 0,
      calories: 0,
      sodium: 0,
      sugars: 0,
      fat: 0,
      saturated_fat: 0,
      ingredients: []
    };
    // Total nutrient values turned into an object
    ingredients.map((elem, index) => {
      nutrientsObject.protein += Math.round(elem.protein * elem.quantity);
      nutrientsObject.carbs += Math.round(elem.carbs * elem.quantity);
      nutrientsObject.calories += Math.round(elem.calories * elem.quantity);
      nutrientsObject.sodium += Math.round(elem.sodium * elem.quantity);
      nutrientsObject.sugars += Math.round(elem.sugars * elem.quantity);
      nutrientsObject.fat += Math.round(elem.fat * elem.quantity);
      nutrientsObject.saturated_fat += Math.round(elem.saturated_fat * elem.quantity);
      // Ingredient names added to nutrients object
      nutrientsObject.ingredients[index] = {
        name: elem.name,
        quantity: elem.quantity
      };
    });
    const descriptionObject = {
      totalNutrients: nutrientsObject,
      instructions: inputs.instructions
    };

    const fd = new FormData();
    const filename = file.uri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = '';
    if (file.type === 'image') {
      type = match ? `image/${match[1]}` : `image`;
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    fd.append('file', { uri: file.uri, name: filename, type });
    fd.append('title', inputs.recipeName);
    fd.append('description', JSON.stringify(descriptionObject));

    uploadRecipe(fd)
      .then((response) => {
        console.log('response from Recipe Creation: \n', response);
        setRecipes([]);
        setTimeout(() => {
          resetAll();
          reloadRecipes(setRecipes);
          navigation.navigate('Home');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    handleRecipeNameChange,
    inputs,
    errors,
    handleInstructionsChange,
    handleRecipeUpload,
    clearInputs
  };
};
export default useRecipeForm;

const validator = (field, value) => {
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;
  } else {
    object = value;
  }
  const constraint = validation[field];
  const result = validate(object, { [field]: constraint });

  if (result) {
    return result[field][0];
  }
  return null;
};
