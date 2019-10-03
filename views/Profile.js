import React, {useContext, useState} from 'react';
import {StyleSheet, View,  AsyncStorage, Image} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {MediaContext} from '../contexts/MediaContext';
import mediaAPI from '../hooks/ApiHooks';

const Profile = (props) => {

  const {user} = useContext(MediaContext);
 // console.log('user', user);
  const {getAvatar} = mediaAPI();

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };



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
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style ={{fontSize:25}}>{user.username}</Text>
                  <Text note>{user.email}</Text>
                </Body>
                <Thumbnail source={{uri: getAvatar(user)}} style={{borderRadius: 50,
                width: 100,
                height: 100,}} />
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color:"#1589FF",
    },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
