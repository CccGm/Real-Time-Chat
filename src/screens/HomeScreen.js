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
import {FAB} from 'react-native-paper';

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
          navigation.navigate('Chat', {
            name: item.name,
            uid: item.uid,
            status:
              typeof item.status == 'string'
                ? item.status
                : item.status.toDate().toString(),
          })
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={users}
        renderItem={({item}) => <RenderCard item={item} />}
        keyExtractor={item => item.uid}
      />
      <FAB
        style={styles.fab}
        icon="face-man-profile"
        color="black"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 3,
    padding: 4,
    marginLeft: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightgreen',
  },
  text: {fontSize: 18, marginLeft: 15, color: 'black', marginTop: 2},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgreen',
  },
});
