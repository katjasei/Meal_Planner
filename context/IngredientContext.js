import React, {useState} from 'react';
import PropTypes from 'prop-types';

const IngredientContext = React.createContext([{}, () => {}]);

// Context for ingredients to be displayed on the searched ingredients list

const IngredientProvider = (props) => {
  const [ingredients, setIngredients] = useState();
  return (
    <IngredientContext.Provider value={[ingredients, setIngredients]}>
      {props.children}
    </IngredientContext.Provider>
  );
};

IngredientProvider.propTypes = {
  children: PropTypes.node,
};

export {IngredientContext, IngredientProvider};
