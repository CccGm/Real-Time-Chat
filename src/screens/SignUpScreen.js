import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, SetName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const PickImageAndUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const uploadTask = storage()
        .ref()
        .child(`userprofile/${uuid.v4()}`)
        .putFile(image.path);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) Alert.alert('image uploaded');
        },
        error => {
          Alert.alert('image upload error => ' + error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

  const UserSignUp = async () => {
    setLoading(true);
    if (!email || !password || !image || !name) {
      Alert.alert('All Details are Required');
      setLoading(false);
      return;
    }

    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      fireStore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        pic: image,
      });
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
            <Button
              mode="contained"
              onPress={() => {
                UserSignUp();
              }}>
              SignUp
            </Button>
            <Button
              mode="contained"
              disabled={image === '' ? false : true}
              onPress={() => {
                PickImageAndUpload();
              }}>
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

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{textAlign: 'center', color: 'blue'}}>
          Already have an Account ?
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

export default SignUpScreen;
