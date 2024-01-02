import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen({user}) {
  const [profile, setProfile] = useState('');

  useEffect(() => {
    fireStore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(docSnap => {
        setProfile(docSnap.data());
      });
  }, []);

  if (!profile) {
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
    <View style={styles.container}>
      <Image source={{uri: profile.pic}} style={styles.img} />
      <Text style={[styles.text, {marginTop: 25}]}>Name :- {profile.name}</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Feather name="mail" size={28} color={'grey'} />
        <Text style={[styles.text, {marginLeft: 10}]}>{profile.email}</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          fireStore()
            .collection('users')
            .doc(user.uid)
            .update({
              status: fireStore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              auth().signOut();
            });
        }}
        style={styles.button}>
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    margin: 50,
  },
  text: {
    fontSize: 23,
    color: 'white',
  },
  button: {
    borderColor: 'white',
    borderWidth: 3,
    marginTop: 30,
  },
});
