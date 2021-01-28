import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILHospitalBG} from '../../assets/illustration';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import ListHospital from '../../components/molecules/ListHospital';
import {Firebase} from '../../config';

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    Firebase.database()
      .ref('hospitals/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setHospitals(filterData);
        }
      });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospital</Text>
        <Text style={styles.desc}>{hospitals.length} tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitals.map((hospital) => (
          <ListHospital
            key={hospital.id}
            type={hospital.type}
            name={hospital.name}
            address={hospital.address}
            pic={hospital.image}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
