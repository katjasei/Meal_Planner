import React from 'react';
import PropTypes from 'prop-types';
import { Image} from 'react-native';
import { ListItem as BaseListItem, Content, Text, Card, CardItem, Body,Left,  Right } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

base_url = "http://media.mw.metropolia.fi/wbma/uploads/";

const MealItem = (props) => {

  const {navigation, singleMeal} = props;
  const recipeInfo = JSON.parse(singleMeal.description);
  //const {getThumbnail} = mediaAPI();
  //const tn = getThumbnail(singleMedia.file_id);


  return (

<BaseListItem onPress={() => {
    navigation.push('Single', {file: singleMeal});
      }}>
<Content>
<Card style={{flex: 0}}>
            <CardItem>
            <Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + singleMeal.filename }}
        style={{height: 70, width: 70}}></Image>
        <Right style={{}}>
          <Left style={{marginLeft:7}}>
           <Text style={{fontWeight:"bold",paddingBottom:5}}>{singleMeal.title}</Text>
           
           <Text>Calories: {recipeInfo.totalNutrients.calories}</Text>
           
           </Left>
        </Right>
        
            </CardItem>
 </Card>
   </Content>
    </BaseListItem>
  )};


MealItem.propTypes = {
  singleItem: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default MealItem;
