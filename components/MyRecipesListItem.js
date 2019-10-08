import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as BaseListItem,
  Button,
  Left,
  Thumbnail,
  Body,
  Right,
  H2,
  Text,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import {MediaContext} from '../context/MediaContext';

const MyRecipesListItem = (props) => {
  const {setMedia, setMyMedia} = useContext(MediaContext);
  const {navigation, singleRecipe} = props;
  const {getThumbnail, deleteMedia} = mediaAPI();
  const tn = getThumbnail(singleRecipe.file_id);
  const recipeInfo = JSON.parse(singleRecipe.description);

  return (
    <BaseListItem thumbnail>
      <Left>
        {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />
        }
      </Left>
      <Body>
        <H2>{singleRecipe.title}</H2>
        <Text numberOfLines={2}>Calories: {recipeInfo.totalNutrients.calories}</Text>
      </Body>
      <Right style = {{paddingBottom:6}}>
        <Button
          onPress={
            () => {
              console.log('klik');
              navigation.push('Single', {file: singleRecipe});
            }
          }
        >
          <Text>View</Text>
        </Button>
        <Button
          onPress={
            () => {
              console.log('press');
              deleteMedia(singleRecipe, setMyMedia, setMedia);
            }
          }
        >
          <Text>Delete</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

MyRecipesListItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyRecipesListItem;
