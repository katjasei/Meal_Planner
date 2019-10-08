import React from 'react';
import {StyleSheet, View, AsyncStorage, Image, TextInput} from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import RecipeList from '../components/RecipeList';

import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {
  const {navigation} = props;
  const {userToContext} = mediaAPI();
  userToContext().then((user) => {
    console.log('usercontext', user);
  });

    return (
      <Container>
    <Header style={{backgroundColor:"white"}}>
        <Left> 
        </Left>

        <View style ={{flexDirection:"row", borderColor:"lightgrey",
      borderWidth:1, width:300, height:30, borderRadius:10, marginTop:10}}>
       
        <Icon style ={{color:"#999", fontSize:18, margin:7}}
        name='search'
        color='lightgrey'
        size={5}
        />
        <TextInput style={styles.inputText}
                  placeholder={'Search recipes'}
                  placeholderTextColor={'#999'}
                  autoCorrect={false}
        />
              
        </View>
        <Right />
      </Header>
      <RecipeList navigation={navigation}></RecipeList>
      
     </Container>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      alignItems:"center",
      paddingTop:200,
    },

    buttonStyle: {
      marginRight:50,
      marginLeft:50, 
      marginBottom:10, 
      justifyContent:"center"
    },

    inputText: {
      flex:1,
      fontSize: 18,
      marginTop:3,
      color: '#999',
    },
    
  });


  //props
  Home.propTypes = {
    navigation: PropTypes.object,
  };

  export default Home;