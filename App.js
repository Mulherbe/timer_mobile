import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Login from './component/user/login';
import Register from './component/user/register';
import Homescreen from './component/user/homescreen';

 const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",}}>
                  <Stack.Screen
          name="Homescreen"
          component={Homescreen}
          options={{ headerBackTitleVisible: false, headerTintColor: '#9025E8',}}
          />
                <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerBackTitleVisible: false, headerTintColor: '#9025E8',}}
          />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerBackTitleVisible: false, headerTintColor: '#9025E8',}}
          />
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
