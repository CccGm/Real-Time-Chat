import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import fireStore from '@react-native-firebase/firestore';

const ChatScreen = ({user, route}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;

  useEffect(() => {
    getAllmessage();
  }, []);

  const getAllmessage = async () => {
    const docId = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const querySnap = await fireStore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySnap.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };

  const onSend = messagesArray => {
    const msg = messagesArray[0];
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date(),
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));

    const docId = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    fireStore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({...mymsg, createdAt: fireStore.FieldValue.serverTimestamp()});
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'orange',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;
