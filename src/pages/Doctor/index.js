import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, showError} from '../../utils';
import {Firebase} from '../../config';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';

export default function Doctor({navigation}) {
  const [news, setNews] = useState([]);
  const [doctorCategories, setDoctorCategories] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);

  useEffect(() => {
    getNews();
    getDoctorCategories();
    getTopRatedDoctor();
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

  const getNews = () => {
    Firebase.database()
      .ref('news')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(filterData);
        } else {
          return [];
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getDoctorCategories = () => {
    Firebase.database()
      .ref('doctor_categories')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setDoctorCategories(filterData);
        } else {
          return [];
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getTopRatedDoctor = () => {
    Firebase.database()
      .ref('doctors')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = parseArray(res.val());
          const filterData = data.filter((el) => el !== null);
          setTopDoctors(filterData);
        } else {
          return [];
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.categoryWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {doctorCategories?.map((category) => (
                  <DoctorCategory
                    key={category.id}
                    category={category.category}
                    onPress={() =>
                      navigation.navigate('ChooseDoctor', category)
                    }
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {topDoctors?.map((doctor) => (
              <RatedDoctor
                key={doctor.id}
                name={doctor.data.fullName}
                desc={doctor.data.profession}
                avatar={{uri: doctor.data.photo}}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            ))}

            <Text style={styles.sectionLabel}>Good News</Text>
            {news?.map((item) => (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            ))}
          </View>
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 220,
  },
  categoryWrapper: {marginHorizontal: -16},
  category: {flexDirection: 'row'},

  contentWrapper: {paddingHorizontal: 16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
