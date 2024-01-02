import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import fireStore from '@react-native-firebase/firestore';

export default function HomeScreen({user, navigation}) {
  const [users, setUsers] = useState('');
  const getUsers = async () => {
    const querySnap = await fireStore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allusers = querySnap.docs.map(docSnap => docSnap.data());
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Chat', {name: item.name, uid: item.uid})
        }>
        <Image source={{uri: item.pic}} style={styles.image} />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.email}</Text>
        </View>
      </TouchableOpacity>
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
  card: {
    flexDirection: 'row',
    margin: 3,
    padding: 4,
    backgroundColor: 'white',
    // borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightgreen',
  },
  text: {fontSize: 18, marginLeft: 15, color: 'black'},
});
