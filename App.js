import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};

const Stack = createStackNavigator();

function MyStack() {
  const [user, setUser] = useState('');
  useEffect(() => {
    const unRegister = auth().onAuthStateChanged(userExist => {
      if (userExist) setUser(userExist);
      else setUser('');
    });

    return () => {
      unRegister();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'green',
        }}>
        {user != '' ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Chat Message',
                headerRight: () => (
                  <MaterialIcons
                    name="account-circle"
                    size={34}
                    color={'green'}
                    style={{marginRight: 20}}
                    onPress={() => auth().signOut()}
                  />
                ),
              }}
            />
            {/* <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            /> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'lightgreen'} />
        <SafeAreaView style={{flex: 1}}>
          <MyStack />
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}

export default App;
