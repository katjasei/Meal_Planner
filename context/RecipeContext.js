import React, {useState} from 'react';
import PropTypes from 'prop-types';

const RecipeContext = React.createContext([{}, () => {}]);


const RecipeProvider = (props) => {
  const [recipes, setRecipes] = useState();
  return (
    <RecipeContext.Provider value={[recipes, setRecipes]}>
      {props.children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.node,
};

export {RecipeContext, RecipeProvider};
