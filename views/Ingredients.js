import React, {useState, useContext} from 'react';
import {View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import useRecipeSearch from '../hooks/RecipeSearchHook';
import {List} from 'native-base';
import AddIngredient from '../components/AddIngredients';

// The screen for searching ingredients and adding them into a recipe

const Ingredients = (props) => {
  const {getAllIngredients} = mediaAPI();
  const [data] = getAllIngredients();
  const {input, handleSearchChange} = useRecipeSearch();
  const [names, setNames] = useState();

  const searchIngredient = (text) => {
    const igrArray = [];
    data.map((item) => {
      const itemName = item.item_name.split(' ')[0];
      const itemToUpper = itemName.toUpperCase();
      if (itemToUpper.startsWith(text.toUpperCase())) {
        igrArray.push({name: item.item_name, quantity: 0, _data: item});
      }
    });
    setNames(igrArray);
  };

  return (
    <View>
      <TextInput
        style={{height: 30, fontSize: 25, margin: 16}}
        onFocus={() => {
          // automatically displays all items (which start with '') if nothing is typed in
          input.letters.length == 0 ? searchIngredient('') : searchIngredient(input.letters);
        }}
        onChangeText={(text) => {
          handleSearchChange(text);
          searchIngredient(text);
        }}
        placeholder={'search for an ingredient...'}></TextInput>
      <List
        dataArray={names}
        keyExtractor={(item, index) => index.toString()}
        renderRow={(item) => (
          <View>
            <AddIngredient
              // AddIngredient is a list item for a searched ingredient
              navigation={props.navigation}
              ingredient={item.name}
              data={item._data}
              quantity={item.quantity}
            />
          </View>
        )}></List>
    </View>
  );
};
Ingredients.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Ingredients;
