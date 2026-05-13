import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import AddDIYHackScreen from './AddDIYHackScreen';
import DIYHackDetailScreen from './DIYHackDetailScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';


import useAuthentication from './useAuthentication';

const Stack = createStackNavigator();

export default function App() {

    const { user } = useAuthentication();

    const handleLogout = async () => {
        await signOut(auth);
    }

    const logoutButton = () => (
        <Pressable
            style={{ margin: 3 }}
            onPress={() => {
                handleLogout();
                console.log('User logged out');
            }}
        >
            <Ionicons name="log-out-outline" size={24} color="grey" />
        </Pressable>
    )

    //Add a function to return logout button

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}
                        options={{
                            headerShown: true,
                            title: "Home",
                            headerRight: logoutButton,
                        }} />
                    <Stack.Screen name="AddDiyHack" component={AddDIYHackScreen}
                        options={{
                            headerShown: true,
                            title: "Add a DIY Hack",
                            headerRight: logoutButton,
                        }} />
                    <Stack.Screen name="DiyHackDetail" component={DIYHackDetailScreen}
                        options={{
                            headerShown: true,
                            title: "Check out this hack!",
                            headerRight: logoutButton,
                        }} />
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

