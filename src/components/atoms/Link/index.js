import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function Link({title, fontSize, textAlign, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(fontSize, textAlign)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: (fontSize, textAlign) => ({
    fontSize,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    textDecorationLine: 'underline',
    textAlign,
  }),
});
