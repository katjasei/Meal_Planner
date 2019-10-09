import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Body, Header, H2, Thumbnail} from 'native-base';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';

const Single = props => {
  const {navigation} = props;
  console.log('Singel navi', navigation.state);
  const {getUserInfo, getAvatar, getThumbnail} = mediaAPI();
  const file = navigation.state.params.file;
  const tn = getThumbnail(file.file_id);
  var x = null;
  var ingrList = '';
  const recipeInfo = JSON.parse(file.description);
  console.log(recipeInfo);
  console.log(recipeInfo.totalNutrients.ingredients.name);

  //for loop to get the ingredient names
  for (i in recipeInfo.totalNutrients.ingredients) {
    x = '-' + recipeInfo.totalNutrients.ingredients[i].name;
    ingrList = ingrList + x + '\n';
    console.log(x);
  }

  return (
    <ScrollView>
      <Header>
        <H2
          style={{
            fontWeight: 'bold',
            color: 'white',
            textShadowRadius: 10,
            textShadowOffset: {width: -1.5, height: 1.5},
            textShadowColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {file.title}
        </H2>
      </Header>

      <Image
        source={{
          uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160
        }}
        style={{height: 340, width: '100%'}}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 60,
          left: 5,
          right: 0,
          bottom: 0
        }}
      >
        <Thumbnail
          source={{uri: getAvatar(file.user_id)}}
          style={{
            borderRadius: 50,
            width: 40,
            height: 40
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          position: 'absolute',
          fontSize: 15,
          top: 70,
          left: 55,
          right: 0,
          bottom: 0,
          textShadowRadius: 10,
          textShadowOffset: {width: -1.5, height: 1.5},
          textShadowColor: 'black',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        by {getUserInfo(file.user_id).username}
      </Text>
      <View>
        <H2
          style={{
            left: 10,
            paddingTop: 20
          }}
        >
          Ingredients
        </H2>
        <Body>
          <Text style={styles.text}>{ingrList}</Text>
        </Body>
      </View>
      <View>
        <H2
          style={{
            left: 10,
            paddingTop: 20
          }}
        >
          Preparation
        </H2>
        <Body>
          <Text style={styles.text}>{recipeInfo.instructions}</Text>
        </Body>
      </View>
      <View>
        <H2
          style={{
            left: 10,
            paddingTop: 20
          }}
        >
          Nutritional Values
        </H2>
        <Body>
          <Text style={styles.text}>
            Calories: {recipeInfo.totalNutrients.calories}kcal
          </Text>
          <Text style={styles.text}>
            Protein: {recipeInfo.totalNutrients.protein}g
          </Text>
          <Text style={styles.text}>
            Carbohydrates: {recipeInfo.totalNutrients.carbs}g
          </Text>
          <Text style={styles.text}>Fat: {recipeInfo.totalNutrients.fat}g</Text>
          <Text style={styles.text}>
            Saturated fat: {recipeInfo.totalNutrients.saturated_fat}g
          </Text>
          <Text style={styles.text}>
            Sodium: {recipeInfo.totalNutrients.sodium}mg
          </Text>
          <Text style={styles.text}>
            Sugars: {recipeInfo.totalNutrients.sugars}g
          </Text>
        </Body>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeButtons: {
    paddingTop: 50
  },
  text: {
    fontSize: 15,
    fontFamily: 'Roboto',
    padding: 5
  }
});

//props
Single.propTypes = {
  navigation: PropTypes.object,
  singleRecipe: PropTypes.object,
  file: PropTypes.object
};

export default Single;
