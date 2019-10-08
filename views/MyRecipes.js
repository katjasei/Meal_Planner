import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import { Container, Title, Header, Content,  Left, Body, Right } from 'native-base';
import MyRecipesList from '../components/MyRecipesList';


const MyRecipes = (props) => {
  const {navigation} = props;
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
      <Content>
        <MyRecipesList navigation={navigation}></MyRecipesList>
      </Content>
    </Container>
  );
};

MyRecipes.propTypes = {
  navigation: PropTypes.object,
};

export default MyRecipes;
