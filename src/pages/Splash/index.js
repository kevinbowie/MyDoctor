import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {Firebase} from '../../config';
export default function Splash({navigation}) {
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      }, 2000);
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 20,
    fontFamily: fonts.primary[600],
  },
});
