import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {IconSendDark, IconSendLight} from '../../../assets';
import {colors} from '../../../utils';

export default function BtnIconSend({disable, onPress}) {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <IconSendDark />
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
        <IconSendLight />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: (disable) => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 3,
  }),
});
