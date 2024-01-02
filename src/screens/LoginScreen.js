import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const UserLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert('All Details are Required');
      setLoading(false);
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      Alert.alert('something went wrong', error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size={80}
        color={'lightgreen'}
        style={{
          justifyContent: 'center',
          flex: 1,
        }}
      />
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
      <View style={styles.box1}>
        <Text style={styles.text}>Whatshapp Chat</Text>
        <Image source={require('../assets/wa.png')} style={styles.img} />
      </View>

      <View style={styles.box2}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={() => {
            UserLogin();
          }}>
          Login
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={{textAlign: 'center', color: 'blue'}}>
          Don't Have an Account ?
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  text: {
    fontSize: 22,
    color: 'green',
    margin: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '40%',
  },
});

export default LoginScreen;
