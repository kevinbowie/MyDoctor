import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function index({navigation, route}) {
  const dataDoctor = route.params;
  const doctor = dataDoctor.data;

  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={doctor.fullName}
        desc={doctor.profession}
        photo={{uri: doctor.photo}}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value={doctor.university} />
      <ProfileItem label="Tempat Praktik" value={doctor.hospital_address} />
      <ProfileItem label="No. STR" value={doctor.str_number} />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', dataDoctor)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  action: {paddingHorizontal: 40, paddingTop: 23},
});
