import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import fireStore from '@react-native-firebase/firestore';

const ChatScreen = ({user, route}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;

  // https://source.unsplash.com/1024x768/?nature

  useEffect(() => {
    // getAllmessage();

    const docId = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const messageRef = fireStore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSnap => {
        const data = docSnap.data();

        if (data.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
            avatar: 'https://source.unsplash.com/1024x768/?nature',
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date(),
            avatar: 'https://source.unsplash.com/1024x768/?nature',
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // const getAllmessage = async () => {
  //   const docId = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
  //   const querySnap = await fireStore()
  //     .collection('chatrooms')
  //     .doc(docId)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc')
  //     .get();
  //   const allmsg = querySnap.docs.map(docSnap => {
  //     return {
  //       ...docSnap.data(),
  //       createdAt: docSnap.data().createdAt.toDate(),
  //     };
  //   });
  //   setMessages(allmsg);
  // };

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
                  backgroundColor: '#7be227e5',
                },
                left: {
                  backgroundColor: '#88e99340',
                },
              }}
            />
          );
        }}
        // renderInputToolbar={props => {
        //   return (
        //     <InputToolbar
        //       {...props}
        //       containerStyle={{borderTopWidth: 1.5, borderColor: '#333'}}
        //     />
        //   );
        // }}
      />
    </View>
  );
};

export default ChatScreen;
// /chatrooms/JAR2PkfKpVhlitYGTwYRlafXNNm2-fa0LyHQL9BWj3ydFN3YsItSsAyi1/messages/j1mlUhNFIcuirNgn4O06
