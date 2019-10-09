import React, {useContext, useState} from 'react';
import {StyleSheet, View,  AsyncStorage, Image} from 'react-native';
import PropTypes from 'prop-types';
import { List, ListItem, Separator, Container, Title, Accordion, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import {MediaContext} from '../context/MediaContext';
import mediaAPI from '../hooks/ApiHooks';

const Profile = (props) => {


  const {user} = useContext(MediaContext);
   
  
  console.log('user', user);
  const {getAvatar} = mediaAPI();

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  
  const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();


   [date,setDate] = useState(day +"."+month+"."+year);

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
                <Thumbnail source={{uri: getAvatar(user.user_id)}} style={{borderRadius: 50,
                width: 100,
                height: 100,}} />
              </Left>
            </CardItem>
          <CardItem>
            <Body>
              <Body>
          <DatePicker
          style={{width: 200}}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD.MM.YYYY"
          minDate="01.01.2018"
          maxDate="01.01.2022"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {setDate(date)}}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          />
          </Body>
          </Body>
          </CardItem>
          </Card>

          <Text style ={{textAlign:"center", justifyContent:"center",paddingTop:5, paddingBottom:5, fontSize:20}}>Plan for {date} </Text>
         
         <Card style={{flex: 0}}>
         <CardItem>
         <Left>
         <Body>
         <Text>BREAKFAST</Text>
         </Body>
         <Button transparent style ={{paddingLeft:30}}><Icon name= "add-circle"></Icon></Button>
        
         </Left>
         </CardItem>
         </Card>
         <Card style={{flex: 0}}>
         <CardItem>
         <Left>
         <Body>
         <Text>LUNCH</Text>
         </Body>
         <Button transparent style ={{paddingLeft:30}}><Icon name= "add-circle"></Icon></Button>
        
         </Left>
         </CardItem>
         </Card>

         <Card style={{flex: 0}}>
         <CardItem>
         <Left>
         <Body>
         <Text>DINNER</Text>
         </Body>
         <Button transparent style ={{paddingLeft:30}}><Icon name= "add-circle"></Icon></Button>
        
         </Left>
         </CardItem>
         </Card>

         <Card style={{flex: 0}}>
         <CardItem>
         <Left>
         <Body>
         <Text>EXTRA</Text>
         </Body>
         <Button transparent style ={{paddingLeft:30}}><Icon name= "add-circle"></Icon></Button>
        
         </Left>
         </CardItem>
         </Card>


        </Content>
        
        <Button rounded info onPress={signOutAsync} style={{marginRight:50,marginLeft:50,marginBottom:10,justifyContent:"center"}}><Text>Logout!</Text></Button>
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
