import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StatusBar, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";

import Header from '../../Components/Header';

const MyList = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
  });

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('myList')
      .onSnapshot(snapshot => {
        setMovies(snapshot.docs.map(doc => doc.data()))
      })
  }, [])


  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  return (
    <>
      {
        movies?.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              position: 'absolute',
              zIndex: 50,
              top: '40%',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontFamily: "Montserrat_400Regular",
                fontSize: 23,
                textAlign: 'center',
              }}
            >There are no movies in your list.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#E7442E',
                padding: 10,
                borderRadius: 10,
                margin: 10,
              }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ color: 'white', fontFamily: "Montserrat_300Light", fontSize: 15, }}>
                Browse Movies
              </Text>
            </TouchableOpacity>
          </View>
        )
      }
      <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
        <Header login={true} goBack={navigation.goBack} label="My List" />
        <View
          style={{
            paddingLeft: 10,
            margin: 30,
            marginLeft: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {movies?.map((movie, item) => {
            return (
              <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                navigation.navigate("ViewMovie", {
                  id: movie.movieID,
                })
              }}>
                <View style={{ paddingRight: 9 }}>
                  <Image
                    style={{
                      width: Math.round((Dimensions.get('window').width * 30) / 100),
                      height: 200,
                      borderRadius: 10,
                    }}
                    resizeMode='cover'
                    source={{ uri: movie.banner }}
                  />
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </>
  )
}

export default MyList