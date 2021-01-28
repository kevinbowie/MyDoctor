import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  IconDoctor,
  IconDoctorActive,
  IconHospitals,
  IconHospitalsActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, isActive, onPress, onLongPress}) {
  const Icon = () => {
    if (title === 'Doctor') {
      return isActive ? <IconDoctorActive /> : <IconDoctor />;
    } else if (title === 'Messages') {
      return isActive ? <IconMessagesActive /> : <IconMessages />;
    } else if (title === 'Hospitals') {
      return isActive ? <IconHospitalsActive /> : <IconHospitals />;
    } else {
      return isActive ? <IconDoctorActive /> : <IconDoctor />;
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(isActive)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: (isActive) => ({
    fontSize: 10,
    color: isActive ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
