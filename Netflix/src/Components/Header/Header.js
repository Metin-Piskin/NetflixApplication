import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold
} from '@expo-google-fonts/montserrat';


const Header = ({ navigation, login, goBack, label }) => {

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
  });

  let fontSize = 18;
  let marginLeft = 15;
  let color = 'white';



  const signOutUser = () => {
    auth().signOut().then(() => {
      navigation.navigate('AuthStack');
    })
  }


  return (
    login ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: (40, 25, 0, 25),
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {
            goBack ? (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={goBack}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <Image style={{ width: 23, height: 45 }} source={require('../../Assets/logo.png')} />
            )
          }
          {
            label && (
              <Text style={{
                color,
                marginLeft,
                fontSize,
                fontFamily: 'Montserrat_100Thin_Italic'
                //fontFamily: "Montserrat_400Regular",
              }}>{label}</Text>
            )
          }
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {
            goBack ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { navigation.navigate("Search") }}
              >
                <MaterialIcons name="search" size={30} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { navigation.navigate("Search") }}
              >
                <MaterialIcons name="search" size={35} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            )
          }
          {
            goBack ? (
              <TouchableOpacity onPress={signOutUser}>
                <Image
                  style={{
                    width: 38,
                    height: 35,
                    borderRadius: 9,
                  }}
                  resizeMode='contain'
                  source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={signOutUser}>
                <Image
                  style={{
                    width: 38,
                    height: 35,
                    borderRadius: 9,
                  }}
                  resizeMode='contain'
                  source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
              </TouchableOpacity>
            )
          }
        </View>
      </View >
    ) : (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: spacebetween,
          paddingLeft: 20,
          width: '100%',
        }}
      >
        <Image
          style={{
            width: 125,
            height: 145,
          }}
          resizeMode='contain'
          source={require('../../Assets/netflixlogo2.png')}
        />
      </View>
    )
  )
}

export default Header;