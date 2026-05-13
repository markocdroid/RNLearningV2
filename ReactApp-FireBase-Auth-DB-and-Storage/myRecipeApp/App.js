import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import AddRecipeScreen from './AddRecipeScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

import useAuthentication from './useAuthentication';

const Stack = createStackNavigator();

export default function App() {

  const {user} = useAuthentication();

  
  if (user){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      </NavigationContainer>  
    );  
  }
}

