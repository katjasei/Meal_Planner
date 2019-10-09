import React, {useState} from 'react';
import PropTypes from 'prop-types';

const SelectedIngredients = React.createContext([{}, () => {}]);

// Context for the currently selected ingredients

const SIProvider = (props) => {
  const [ingredients, setIngredients] = useState([]);
  return (
    <SelectedIngredients.Provider value={[ingredients, setIngredients]}>
      {props.children}
    </SelectedIngredients.Provider>
  );
};

SIProvider.propTypes = {
  children: PropTypes.node,
};

export {SelectedIngredients, SIProvider};
