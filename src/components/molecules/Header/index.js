import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../../atoms';
import {colors, fonts} from '../../../utils';
import DarkProfile from './DarkProfile';

export default function Header({onPress, type, title, desc, photo}) {
  if (type === 'dark-profile') {
    return (
      <DarkProfile
        onPress={onPress}
        title={title}
        desc={desc}
        type={type}
        photo={photo}
      />
    );
  }

  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
  text: (type) => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    textTransform: 'capitalize',
    color: type === 'dark' ? colors.white : colors.text.primary,
  }),
});
