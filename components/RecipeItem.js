import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as BaseListItem,
  Button,
  Left,
  Thumbnail,
  Body,
  Right,
  H2,
  H3,
  Text,
  Card,
  CardItem
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { Image, TouchableOpacity, View } from 'react-native';

const RecipeItem = (props) => {
  //const {userInfo, setUserInfo} = useState({username: ''});
  const { navigation, singleRecipe } = props;
  const { getThumbnail, getUserInfo, getAvatar } = mediaAPI();
  const tn = getThumbnail(singleRecipe.file_id);
  const recipeInfo = JSON.parse(singleRecipe.description);

  useEffect(() => {
    //setUserInfo(getUserInfo(singleRecipe.user_id));
    //console.log('description from RecipeItem: \n', recipeInfo);
    //console.log('calories: \n', recipeInfo.totalNutrients.calories);
    // etc...
  });
  return (
    <Card style={{ marginLeft: 0, marginRight: 0 }}>
      <TouchableOpacity
        onPress={() => {
          console.log('Navigate to single here with:\n', recipeInfo);
          navigation.push('Single', {file: singleRecipe});
        }}
      >
        <CardItem style={{ marginLeft: 0, marginRight: 0 }}>
          <Body style={{ marginLeft: 0, marginRight: 0 }}>
            <Image
              source={{
                uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160
              }}
              style={{ height: 340, width: '100%' }}
            />
            <TouchableOpacity style={{
                  position: 'absolute',
                  top: 15,
                  left: 5,
                  right: 0,
                  bottom: 0
                }}>
              <Thumbnail
                source={{ uri: getAvatar(singleRecipe.user_id) }}
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                fontSize: 15,
                top: 22,
                left: 55,
                right: 0,
                bottom: 0,
                textShadowRadius: 10,
                textShadowOffset: { width: -1.5, height: 1.5 },
                textShadowColor: 'black',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              by {getUserInfo(singleRecipe.user_id).username}
            </Text>
            <View
              style={{
                position: 'absolute',
                top: 230,
                left: 10,
                right: 0,
                bottom: 0,
                marginRight: 20
              }}
            >
              <View style={{ position: 'relative' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: 'white',
                    lineHeight: 25,
                    textShadowRadius: 10,
                    textShadowOffset: { width: -1.5, height: 1.5 },
                    textShadowColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 5
                  }}
                >
                  {singleRecipe.title}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadowRadius: 10,
                    textShadowOffset: { width: -1.5, height: 1.5 },
                    textShadowColor: 'black',
                    bottom: 10,
                    left: 30
                  }}
                >
                  Calories: {recipeInfo.totalNutrients.calories}kcal
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

RecipeItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object
};

export default RecipeItem;
