import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Doctor,
  GetStarted,
  Hospitals,
  Login,
  Messages,
  Register,
  Splash,
  UploadPhoto,
  ChooseDoctor,
  Chatting,
  UserProfile,
  UpdateProfile,
  DoctorProfile,
} from '../pages';
import {BottomNavigator} from '../components';
import {View} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Doctor" component={Doctor} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Hospitals" component={Hospitals} />
    </Tab.Navigator>
  );
};

const hideHeader = {headerShown: false};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={hideHeader} />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={hideHeader}
      />
      <Stack.Screen name="Register" component={Register} options={hideHeader} />
      <Stack.Screen name="Login" component={Login} options={hideHeader} />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={hideHeader}
      />
      <Stack.Screen name="MainApp" component={MainApp} options={hideHeader} />
      <Stack.Screen
        name="ChooseDoctor"
        component={ChooseDoctor}
        options={hideHeader}
      />
      <Stack.Screen name="Chatting" component={Chatting} options={hideHeader} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={hideHeader}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={hideHeader}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={hideHeader}
      />
    </Stack.Navigator>
  );
};

export default Router;
