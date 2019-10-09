
const validation = {

    username: {
      presence: {
        message: '^Please enter an username'
      },
      length: {
        minimum: 3,
        message: '^Your username must be at least 3 characters'
      }
    },
  
    password: {
  
      presence: {
        message: '^Please enter a password'
      },
  
      length: {
        minimum: 5,
        message: '^Your password must be at least 5 characters'
      }
    },
  
    confirm_password: {
  
      equality: 'password',
    },
  
    email: {
      presence: {
        message: '^Please enter an email address'
      },
      email: {
        message: '^Please enter a valid email address'
      }
    },
    recipe: {
      presence: {
        message: '^Recipe name'
      },
      length: {
        minimum: 1,
        message: '^The recipe must have a name (max 35 characters)',  
        maximum: 35,
      }
    },
    instructions: {
      presence: {
        message: '^Instructions here'
      },
      length: {
        minimum: 10,
        message: '^Instructions minimum length is 10 characters'
      }
    },
  
  };
  
  export default validation;