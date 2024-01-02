import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import fireStore from '@react-native-firebase/firestore';

export default function HomeScreen() {
  const [users, setUsers] = useState('');

  const getUsers = async () => {
    const querySnap = await fireStore().collection('users').get();
    const allusers = querySnap.docs.map(docSnap => docSnap.data());
    console.log(allusers);
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const RenderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Image source={{uri: item.pic}} style={styles.image} />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => <RenderCard item={item} />}
        keyExtractor={item => item.uid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {flexDirection: 'row'},
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightgreen',
  },
  text: {fontSize: 18},
});
