import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import Chat from '../Chat';
import {useUserContext} from '../context/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {user} = useUserContext();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{
                headerTitleAlign: 'center',
              }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootStack;
