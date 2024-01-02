import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, SetName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [showNext, setShowNext] = useState(false);

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Whatshapp Chat</Text>
        <Image source={require('../assets/wa.png')} style={styles.img} />
      </View>
      <View style={styles.box2}>
        {!showNext && (
          <>
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
          </>
        )}
        {showNext ? (
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={SetName}
              mode="outlined"
            />
            <Button mode="contained" onPress={() => {}}>
              SignUp
            </Button>
            <Button mode="contained" onPress={() => {}}>
              Select Profile Pic
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              setShowNext(true);
            }}>
            Next
          </Button>
        )}
      </View>
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
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
});

export default SignUpScreen;
