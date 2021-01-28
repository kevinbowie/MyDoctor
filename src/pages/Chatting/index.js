import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts, getChatTime, getData, setDateChat} from '../../utils';
import {Firebase} from '../../config';

export default function Chatting({navigation, route}) {
  const doctor = route.params;
  const [user, setUser] = useState({});
  const [chatContent, setChatContent] = useState('');
  const [chatData, setChatData] = useState([]);

  const sendChat = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent,
    };
    const chatID = `${user.uid}_${doctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMsgUser = `messages/${user.uid}/${chatID}`;
    const urlMsgDoctor = `messages/${doctor.data.uid}/${chatID}`;
    const historyChatForUser = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: doctor.data.uid,
    };
    const historyChatForDoctor = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    Firebase.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');

        Firebase.database().ref(urlMsgUser).set(historyChatForUser);
        Firebase.database().ref(urlMsgDoctor).set(historyChatForDoctor);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  useEffect(() => {
    getUserFromLocal();

    const chatID = `${user.uid}_${doctor.data.uid}`;
    const url = `chatting/${chatID}/allChat`;
    Firebase.database()
      .ref(url)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];

          Object.keys(dataSnapshot).map((key) => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];
            Object.keys(dataChat).map((itemChat) => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });

          setChatData(allDataChat);
        }
      });
  }, [doctor.data.uid, user.uid]);

  const getUserFromLocal = () => {
    getData('user').then((res) => setUser(res));
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={doctor.data.fullName}
        desc={doctor.data.category}
        photo={{uri: doctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map((chat) => (
            <View key={chat.id}>
              <Text style={styles.chatDate}>{chat.id}</Text>
              {chat.data.map((itemChat) => {
                const isMe = itemChat.data.sendBy === user.uid;
                return (
                  <ChatItem
                    key={itemChat.id}
                    isMe={isMe}
                    text={itemChat.data.chatContent}
                    date={itemChat.data.chatTime}
                    photo={isMe ? null : {uri: doctor.data.photo}}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={sendChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {flex: 1, backgroundColor: colors.white},
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
