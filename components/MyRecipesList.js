import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import MyRecipesListItem from './MyRecipesListItem';
import mediaAPI from '../hooks/ApiHooks';
import {MediaContext} from '../context/MediaContext';


const MyRecipesList = (props) => {
  const {navigation} = props;
  const {getAllMyRecipes} = mediaAPI();
  
  const {user} = useContext(MediaContext);
  const [myMedia, loading] = getAllMyRecipes(user.user_id);
  console.log ("uuuuser_id", user.user_id);

  //console.log(loading);
  //console.log('media', myMedia);

  return (
    <BaseList
      dataArray={myMedia}
      renderRow={(item) =>
        <MyRecipesListItem navigation={navigation} singleRecipe={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyRecipesList.propTypes = {
  navigation: PropTypes.object,
};

export default MyRecipesList;
