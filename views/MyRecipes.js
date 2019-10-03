import React from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';

const MyRecipes = (props) => {

    return (
      <Container>
      <Header style={{backgroundColor:"white"}}>
        <Left> 
        </Left>
        <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10}} />
        <Body>
        <Right>
          <Title style={{marginTop:15, color:"black"}}>Meal Planner</Title>
        </Right>         
        </Body>
        <Right />
      </Header>
       <Text>Welcome to MyRecipes Screen</Text>
       </Container>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      alignItems:"center",
      paddingTop:200,
    },
  });


  //props
  MyRecipes.propTypes = {
    navigation: PropTypes.object,
  };

  export default MyRecipes;