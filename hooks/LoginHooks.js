import {useState} from 'react';
import validate from 'validate.js';
import validation from '../validators/Validation';
import mediaAPI from './ApiHooks';

const {userFree} = mediaAPI();

const validator = (field, value) => { // if value is string or object
  // Creates an object based on the field name and field value
  // e.g. let object = {email: 'email@example.com'}
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;

  } else {
    object = value; // if value is object like with confirmPassword
  }

  const constraint = validation[field];


  // Validate against the constraint and hold the error messages
  const result = validate(object, {[field]: constraint});
 // console.log('validator log', object, constraint, result);

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }

  return null;
};


const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});

  const [errors, setErrors] = useState({});

 //Login

  const handleLoginUsernameChange = (text) => {

    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };

  const handleLoginPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };

  //Registration

  const handleUsernameChange = (text) => {

    const usernameError = validator('username', text);
    console.log('usernameError', usernameError);
    setErrors((errors) => ({
      ...errors,
      username: usernameError,
    }));

    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };

  const handlePasswordChange = (text) => {

    const passwordError = validator('password', text);
   // console.log('passwordError', passwordError);
    setErrors((errors) => ({
      ...errors,
      password: passwordError,
    }));

    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };

  const handleConfirmPasswordChange = (text) => {

    setInputs((inputs) =>
      ({
        ...inputs,
        confirm_password: text,
      }));
  };

  const handleEmailChange = (text) => {

    const emailError = validator('email', text);
    console.log('emailError', emailError);
    setErrors((errors) => ({
      ...errors,
      email: emailError,
    }));

    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };

  const handleFull_NameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };

  const validateOnSend = () => {

    const usernameError = validator('username', inputs.username);
    const passwordError = validator('password', inputs.password);
    const emailError = validator('email', inputs.email);
    const confirmError = validator('confirm_password', {password: inputs.password, confirm_password: inputs.confirm_password});

   // console.log("errors", usernameError,passwordError, emailError, confirmError);

    setErrors((errors) => ({
      ...errors,
      username: usernameError,
      password: passwordError,
      email: emailError,
      confirm_password: confirmError,
    }));

    if (!usernameError && !passwordError && !emailError && !confirmError) {
      return true;
    } ;
  };

  const checkUserAvailable = (event) => {
    //console.log('chek user', event.nativeEvent.text);
    userFree(event.nativeEvent.text).then((resp) => {
      setErrors((errors) => ({
        ...errors,
        username: resp,
      }));
    });
  };

  return {
    handleLoginUsernameChange,
    handleLoginPasswordChange,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleFull_NameChange,
    inputs,
    errors,
    validateOnSend,
    checkUserAvailable,
  };
};

export default useSignUpForm;

