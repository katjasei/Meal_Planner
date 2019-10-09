import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ListItem as BaseItem, Text } from 'native-base';
import { Ionicons as Icon } from '@expo/vector-icons';
import { SelectedIngredients } from '../context/SelectedIngredients';

const AddIngredient = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [ingredients, setIngredients] = useContext(SelectedIngredients);

  const ingredientObject = (ingredient, info, key, quantity) => {
    const allergens = [];
    /* 
    // Checking for allergens and adding into the object if any
    for (let property in info) {
      if (property.startsWith('allergen')) {
        if (info[property] != null) {
          console.log(info[property]);
          allergens.push('Contains ' + property.split('allergen_contains_')[1]);
          console.log(property.split('allergen_contains_')[1]);
        }
      }
    };
    */
    return {
      name: ingredient,
      key: key,
      quantity: quantity,
      calories: info.nf_calories,
      carbs: info.nf_total_carbohydrate,
      protein: info.nf_protein,
      sugars: info.nf_sugars,
      sodium: info.nf_sodium,
      fat: info.nf_total_fat,
      saturated_fat: info.nf_saturated_fat,
      allergens: allergens,
    };
  };

  const addNew = (name, data) => {
    let hits = 0;
    if (ingredients.length > 0) {
      // If already an ingredient with the same name -> increases quantity
      const newList = ingredients.map((item, index) => {
        if (item.name == name) {
          item.quantity += quantity;
          item.key = index.toString();
          hits++;
        }
        return item;
      });
      // Create a new ingredient otherwise
      if (hits == 0) {
        const key = ingredients.length.toString();
        const ingredient = ingredientObject(name, data, key, quantity)
        newList.push(
          ingredient
        );
      }
      setIngredients([]);
      setTimeout(() => {
        console.log(`Ingredient ${name} added or updated.`)
        console.log('Updated list:\n', newList);
        setIngredients(newList);
        props.navigation.navigate('CreateRecipe');
      }, 0);
      hits = 0;

      // New list with 1 ingredient
    } else {
      setIngredients([
        ingredientObject(name, data, 0, quantity)
      ]);
      props.navigation.navigate('CreateRecipe');
    }
  };

  return (
    <BaseItem margin={15} padding={15} justifyContent={'space-around'}>
      <View style={{ flexDirection: 'row', flex: 0.5, margin: 10 }}>
        <View>
          <TouchableOpacity
            disabled={quantity > 0 ? false : true}
            style={styles.increment}
            onPress={() => {
              setQuantity(quantity - 1);
            }}
          >
            <Icon
              name={'md-remove-circle'}
              size={25}
              color={quantity > 0 ? 'red' : 'grey'}
            ></Icon>
          </TouchableOpacity>
        </View>
        <Text>{quantity}</Text>

        <TouchableOpacity
          style={styles.increment}
          onPress={() => {
            setQuantity(quantity + 1);
          }}
        >
          <Icon name={'md-add-circle'} size={25} color={'green'}></Icon>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 4, margin: 10 }}>
        <Text style={styles.text}>{props.ingredient}</Text>
      </ScrollView>
      <TouchableOpacity
        disabled={quantity > 0 ? false : true}
        style={{ flex: 1, margin: 10 }}
        onPress={() => {
          addNew(props.ingredient, props.data);
          // - props.ingredient
        }}
      >
        <View
          style={{
            backgroundColor: quantity > 0 ? 'green' : 'grey',
            elevation: 10,
            flexDirection: 'column'
          }}
        >
          <Text style={{ color: 'white', flex: 0.75 }}>Add</Text>
        </View>
      </TouchableOpacity>
    </BaseItem>
  );
};

const styles = StyleSheet.create({
  increment: {
    padding: 5
  },
  text: {
    fontSize: 20,
    flex: 1,
    fontFamily: 'Roboto',
    textAlign: 'center'
  }
});

export default AddIngredient;
