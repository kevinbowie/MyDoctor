import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {Firebase} from '../../config';

export default function Messages({navigation}) {
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getData('user').then((res) => setUser(res));
    const rootDB = Firebase.database().ref();
    const url = `messages/${user.uid}`;
    const messagesDB = rootDB.child(url);

    messagesDB.on('value', async (snapshot) => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        const promises = await Object.keys(oldData).map(async (key) => {
          const urlDoctor = `doctors/${oldData[key].uidPartner}`;
          const doctor = await rootDB.child(urlDoctor).once('value');

          data.push({
            id: key,
            ...oldData[key],
            doctor: doctor.val(),
          });
        });

        await Promise.all(promises);
        console.log(data);
        setHistory(data);
      }
    });
  }, [user.uid]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {history.map((chat) => {
          const doctorForNavigate = {
            id: chat.doctor.uid,
            data: chat.doctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.doctor.photo}}
              name={chat.doctor.fullName}
              lastChat={chat.lastChatContent}
              onPress={() => navigation.navigate('Chatting', doctorForNavigate)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
