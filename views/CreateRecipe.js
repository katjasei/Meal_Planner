/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* global require */
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import IngredientItem from '../components/IngredientItem';
import { Text, List, Card } from 'native-base';
import { SelectedIngredients } from '../context/SelectedIngredients';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import useRecipeForm from '../hooks/RecipeCreateHook';
import { FontAwesome as Icon } from '@expo/vector-icons';

const CreateRecipe = (props) => {
  const [displayErrors, setDisplayErrors] = useState(false);
  const [file, setFile] = useState(null);
  const { navigation } = props;
  const [ingredients, setIngredients] = useContext(SelectedIngredients);
  const {
    handleRecipeNameChange,
    inputs,
    errors,
    handleInstructionsChange,
    handleRecipeUpload,
    clearInputs
  } = useRecipeForm();

  useEffect(() => {});

  // Returns the total value of a chosen nutrient from all the selected ingredients
  // CreateRecipe currently takes only protein and calories as props so rest will have to be implemented
  const getNutrient = (nutrient) => {
    let adder = 0;
    for (let i = 0; i < ingredients.length; i++) {
      adder += ingredients[i][nutrient] * ingredients[i].quantity;
    }
    return Math.round(adder);
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      setFile(result);
    }
  };

  const resetAll = () => {
    clearInputs(setFile);
    setIngredients([]);
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const validateAll = () => {
    return (
      file != null &&
      errors.recipeNameError == null &&
      errors.instructionsError == null &&
      ingredients.length > 1
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Button block onPress={() => resetAll()} title='Reset'></Button>
        <Button
          block
          onPress={pickImage}
          color='green'
          title='Select Image'
        ></Button>
        {file && (
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: file.uri }}
              style={{ width: '100%', height: 200, marginTop: 5 }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                padding: 0,
                margin: 0,
                right: 5,
                top: 5
              }}
              onPress={() => {
                setFile(null);
              }}
            >
              <Icon name={'remove'} size={25} color={'red'}></Icon>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
        <Text style={styles.text}>Recipe</Text>
        <TextInput
          value={inputs.recipeName}
          fontSize={20}
          onChangeText={handleRecipeNameChange}
          placeholder={'recipe name...'}
        ></TextInput>
        <Text style={styles.text}>Ingredients</Text>
        {ingredients.length != 1 ? (
          <Text>({ingredients.length} items)</Text>
        ) : (
          <Text>(1 item)</Text>
        )}
        <Button
          onPress={() => {
            navigation.navigate('Ingredients');
          }}
          margin={20}
          elevation={10}
          color={'green'}
          title={'New Ingredient'}
        ></Button>
        <ScrollView maxHeight={'50%'} nestedScrollEnabled={true}>
          <List
            dataArray={ingredients}
            keyExtractor={(item, index) => item.key.toString()}
            renderRow={(item) => (
              <Card>
                <IngredientItem
                  calories={item.calories}
                  protein={item.protein}
                  ingredient={item.name}
                  quantity={item.quantity}
                  carbs={item.carbs}
                  fat={item.fat}
                  allergens={item.allergens}
                  saturated_fat={item.saturated_fat}
                  sugars={item.sugars}
                  sodium={item.sodium}
                />
              </Card>
            )}
          ></List>
        </ScrollView>
        {ingredients.length > 0 && (
          <Text style={styles.text}>Total Nutrients</Text>
        )}
        {ingredients.length > 0 && (
          <View style={{ maxHeight: '25%' }} nestedScrollEnabled={true}>
            <Text>Calories: {getNutrient('calories')}g</Text>
            <Text>Protein: {getNutrient('protein')}g</Text>
            <Text>Carbohydrates: {getNutrient('carbs')}g</Text>
            <Text>Fat: {getNutrient('fat')}g</Text>
            <Text>Saturated fat: {getNutrient('saturated_fat')}</Text>
            <Text>Sugars: {getNutrient('sugars')}g</Text>
            <Text>Sodium: {getNutrient('sodium')}mg</Text>
          </View>
        )}
        <Text style={styles.text}>Instructions</Text>
        <View>
          <TextInput
            value={inputs.instructions}
            fontSize={20}
            onChangeText={handleInstructionsChange}
            placeholder={'write instructions here...'}
          ></TextInput>
        </View>
        {!validateAll() ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
            onPress={() => {
              setDisplayErrors(!displayErrors);
            }}
          >
            <Icon name='exclamation-triangle' color='red' size={25}></Icon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Icon name='check-circle' color='green' size={25}></Icon>
          </TouchableOpacity>
        )}
        <View>
          {displayErrors && (
            <View>
              {errors.recipeNameError != null && (
                <Text style={styles.errorText}>-{errors.recipeNameError}</Text>
              )}
              {errors.instructionsError != null && (
                <Text style={styles.errorText}>
                  -{errors.instructionsError}
                </Text>
              )}
              {file == null && (
                <Text style={styles.errorText}>-You must select an image</Text>
              )}
              {ingredients.length < 2 && (
                <Text style={styles.errorText}>
                  -You must select at least 2 unique ingredients
                </Text>
              )}
            </View>
          )}
          <Button
            block
            onPress={() => {
              handleRecipeUpload(file, ingredients, navigation, resetAll);
            }}
            disabled={validateAll() ? false : true}
            color={validateAll() ? 'green' : 'grey'}
            title='Create Recipe'
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff'
  },
  toolbar: {
    flex: 1,
    backgroundColor: '#e050ef'
  },
  text: {
    fontSize: 25
  },
  errorText: {
    color: 'red',
    fontSize: 15
  }
});

CreateRecipe.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateRecipe;
