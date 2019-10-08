import React from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import MealItem from './MealItem';


const Meallist = (props) => {
  const {navigation} = props;

  return (
    <BaseList
      dataArray={props.mediaArray}
      renderRow={(item) =>
        <MealItem navigation={navigation} singleMeal={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

Meallist.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,

};

export default Meallist;