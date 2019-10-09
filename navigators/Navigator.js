
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'

import AuthLoading from '../views/AuthLoading';
import Welcome from '../views/Welcome';
import Home from '../views/Home';
import Profile from '../views/Profile';
import MyRecipes from '../views/MyRecipes';
import Single from '../views/Single';
import CreateRecipe from '../views/CreateRecipe';
import Ingredients from '../views/Ingredients';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    MyRecipes,
    CreateRecipe,
    Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        }  else if (routeName === 'MyRecipes') {
          iconName = 'favorite';
        } else if (routeName === 'CreateRecipe') {
          iconName = 'create';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} />;
      }
    })
  }
);

const StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null // this will hide the header
    }
  },
  Single: {
    screen: Single
  },
  Logout: {
    screen: Welcome
  },
  Ingredients: {
    screen: Ingredients,
  },
});

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Welcome
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(Navigator);