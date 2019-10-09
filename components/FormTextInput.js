import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, Label, View} from 'native-base';


const FormTextInput = (props) => {
  const {error, ...otherProps} = props;
  return (
    <View style={{paddingTop:5, paddingBottom:10, paddingRight:50, paddingLeft:50}}>
      <Item rounded style ={{backgroundColor:"white"}}>
        <Input {...otherProps} />
      </Item>
  {error && <Label style={{color:"white"}}>{error}</Label>}
    </View>
  );
};

FormTextInput.propTypes = {
  error: PropTypes.string,
};

export default FormTextInput;
