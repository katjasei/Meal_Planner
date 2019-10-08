import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Image} from 'react-native';
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
  Content,
  Card, 
  CardItem,
  Icon,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const RecipeItem = (props) => {

  const {navigation, singleRecipe} = props;
  const {getUserInfo, getThumbnail, getAvatar} = mediaAPI();
  const recipeInfo = JSON.parse(singleRecipe.description);
  const [userInfo, setUserInfo] = useState({});
  //const [avatar, setAvatar] = useState('http://placekitten.com/100/100');
 
 
  useEffect(() => {
    getUserInfo(singleRecipe.user_id).then((json) => {
      setUserInfo(json);
    }).catch((error) => {
      console.log(console.error);
    });
  }, []);

  

 useEffect(() => {
      //console.log('description from RecipeItem: \n', recipeInfo);
      //console.log('calories: \n', recipeInfo.totalNutrients.calories);
      // etc...
  }, )
  return (
    <BaseListItem onPress={() => {
      navigation.push('Single');
        }}>
      <Content>
      <Card style={{flex: 0}}>
            <CardItem >
            <Body>
              <Body>
             <Image square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + singleRecipe.filename}} style={{height: 340, width: 340, marginRight:5}} />
                <Thumbnail source={{uri: getAvatar(singleRecipe.user_id)}} style={{borderRadius: 20,
                width: 40,
                height: 40, position:"absolute", top: 15, left: 5, right: 0, bottom: 0}} />
                 { <Text style= {{fontWeight:"bold",  color:"white", position:"absolute", top: 22, left: 55, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                  by {userInfo.username}
                </Text>}
                <Text style= {{fontWeight:"bold",fontSize:20,  color:"white", position:"absolute", top: 230, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                {singleRecipe.title}
                </Text>
                <Text style= {{fontWeight:"bold",fontSize: 15,  color:"white", position:"absolute", top: 280, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                  Calories : {recipeInfo.totalNutrients.calories}
                </Text>
                </Body>
              </Body>   
            </CardItem>
            <CardItem>
            <Text style = {{fontSize:20, paddingLeft:40}}>Add to Meal Plan</Text>
            <Right>
            <Button rounded primary 
             style ={{ width:50, height:45, justifyContent: 
             'center', alignItems: 'center', marginRight:20}}
             onPress={() => {
              navigation.push('Profile', {file: singleRecipe});
                }}><Icon name= "add"></Icon>
                </Button>
                </Right>           
            </CardItem>
       </Card>
       </Content>
    </BaseListItem>
  );
};

RecipeItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object,
};

export default RecipeItem;
