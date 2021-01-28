import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconNext,
  IconRate,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function List({profile, name, lastChat, type, onPress, icon}) {
  const Icon = () => {
    switch (icon) {
      case 'edit-profile':
        return <IconEditProfile />;
      case 'language':
        return <IconLanguage />;
      case 'rate':
        return <IconRate />;
      case 'help':
        return <IconHelp />;
      default:
        return <IconEditProfile />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastChat}>{lastChat}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flex: 1, marginLeft: 16},
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  lastChat: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
