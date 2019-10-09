import React from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import RecipeItem from './RecipeItem';
import mediaAPI from '../hooks/ApiHooks';

const RecipeList = (props) => {
  const {navigation} = props;
  const {getRecipes} = mediaAPI();
  const [recipes, loading] = getRecipes();
  console.log(loading);
  console.log('media', recipes);
  return (
    <BaseList style={{marginLeft:0, marginRight:0}}
      dataArray={recipes}
      renderRow={(item) =>
        <RecipeItem navigation={navigation} singleRecipe={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

RecipeList.propTypes = {
  navigation: PropTypes.object,
};

export default RecipeList;