import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';

const Single = (props) => {

    return (
      <View style ={styles.welcomeButtons}>
       <Text>Welcome to Single Screen</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      paddingTop:400,
    },
  });


  //props
  Single.propTypes = {
    navigation: PropTypes.object,
  };

  export default Single;