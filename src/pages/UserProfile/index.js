import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../components';
import {getData, showError} from '../../utils';
import {Firebase} from '../../config';

export default function index({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  });

  const signOut = () => {
    Firebase.auth()
      .signOut()
      .then((res) => {
        console.log('success sign out');
        navigation.replace('GetStarted');
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={16} />
      <List
        name="Edit Profile"
        lastChat="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        lastChat="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        lastChat="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        lastChat="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
});
