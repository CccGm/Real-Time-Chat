import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import fireStore from '@react-native-firebase/firestore';
import ProfileScreen from './src/screens/ProfileScreen';

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
      if (userExist) {
        setUser(userExist);
        fireStore().collection('users').doc(userExist.uid).update({
          status: 'online',
        });
      } else setUser('');
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
              options={{
                title: 'Chat Message',
                headerTitleAlign: 'center',
              }}>
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Chat"
              options={({route}) => ({
                title: (
                  <View>
                    <Text style={{fontSize: 18, color: 'green'}}>
                      {route.params.name}
                    </Text>
                    <Text style={{fontSize: 12, color: 'black'}}>
                      {route.params.status}
                    </Text>
                  </View>
                ),
              })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {props => <ProfileScreen {...props} user={user} />}
            </Stack.Screen>
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
