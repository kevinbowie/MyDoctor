import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {Firebase} from '../../config';
import {colors} from '../../utils';

export default function ChooseDoctor({navigation, route}) {
  const [doctors, setDoctors] = useState([]);
  const category = route.params;

  useEffect(() => {
    doctorsByCategory(category.category);
  }, []);

  const parseArray = (listObject) => {
    const data = [];
    Object.keys(listObject).map((key) => {
      data.push({
        id: key,
        data: listObject[key],
      });
    });
    return data;
  };

  const doctorsByCategory = (category) => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then((res) => {
        const data = parseArray(res.val());
        setDoctors(data);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        title={`Pilih ${category.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {doctors?.map((doctor) => (
        <List
          key={doctor.id}
          type="next"
          profile={{uri: doctor.data.photo}}
          name={doctor.data.fullName}
          lastChat={doctor.data.gender}
          onPress={() => navigation.navigate('DoctorProfile', doctor)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
