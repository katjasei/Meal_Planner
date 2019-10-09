import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  ListItem as BaseItem,
  Text,
  Card,
  Content,
  CardItem,
} from 'native-base';
import {Ionicons as Icon} from '@expo/vector-icons';
import {FontAwesome as RemoveIcon} from '@expo/vector-icons';
import {SelectedIngredients} from '../context/SelectedIngredients';

// The component in the selected ingredients list on CreateRecipe page

const IngredientItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [ingredients, setIngredients] = useContext(SelectedIngredients);

  const removeIngredient = (name) => {
    const newList = ingredients.filter((item) => {
      return item.name != name;
    });
    setIngredients(newList);
    console.log('Removed ingredient:\n', name)
    console.log('Updated List: \n', newList);
  };

  const modifyContext = (name, value) => {
    const newList = ingredients.filter((item) => {
      if (item.name == name) {
        item.quantity = value;
      }
      return item;
    });
    setIngredients(newList);
  };

  return (
    <BaseItem style={{position: 'relative'}}>
      <Content>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginRight: 5, marginLeft: 5, marginTop: 5}}
              disabled={quantity > 1 ? false : true}
              onPress={() => {
                setQuantity(quantity - 1);
                modifyContext(props.ingredient, quantity - 1);
              }}>
              <Icon
                style={{marginRight: 5, marginLeft: 5}}
                name={'md-remove-circle'}
                size={25}
                color={quantity > 1 ? 'red' : 'grey'}></Icon>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Roboto',
                marginRight: 5,
                marginLeft: 5,
                marginTop: 5,
                fontSize: 15,
              }}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={{marginLeft: 5, marginTop: 5}}
              onPress={() => {
                setQuantity(quantity + 1);
                modifyContext(props.ingredient, quantity + 1);
              }}>
              <Icon name={'md-add-circle'} size={25} color={'green'}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.ingredientName}>{props.ingredient}</Text>
            {/*
            <TouchableOpacity>
              <Card
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  padding: 0,
                  flexDirection: 'column',
                }}>
                <CardItem>
                  <Text style={styles.text}>{props.ingredient}</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
              */}
          </View>
        </View>
        <TouchableOpacity>
          <Card>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.66,
                margin: 5,
                padding: 5,
              }}>
              <Text style={styles.text}>
                Calories:{Math.round(props.calories * props.quantity)}kcal
              </Text>
              <Text style={styles.text}>
                Protein:{Math.round(props.protein * props.quantity)}g
              </Text>
              <Text style={styles.text}>
                Carbohydrates:{Math.round(props.carbs * props.quantity)}g
              </Text>
              <Text style={styles.text}>
                Fat:{Math.round(props.fat * props.quantity)}g
              </Text>
              <Text style={styles.text}>
                Saturated fat:{Math.round(props.saturated_fat * props.quantity)}g
              </Text>
              <Text style={styles.text}>
                Sodium:{Math.round(props.sodium * props.quantity)}mg
              </Text>
              <Text style={styles.text}>
                Sugars:{Math.round(props.sugars* props.quantity)}g
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </Content>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          padding: 0,
          margin: 0,
          right: 5,
          top: 0,
        }}
        onPress={() => {
          removeIngredient(props.ingredient);
        }}>
        <RemoveIcon name={'remove'} size={25} color={'red'}></RemoveIcon>
      </TouchableOpacity>
    </BaseItem>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  TO: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Roboto',
    padding: 5,
  },
  ingredientName: {
    fontSize: 20,
    fontFamily: 'Roboto',
    padding: 5,
  },
});

export default IngredientItem;
