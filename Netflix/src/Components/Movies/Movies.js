import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Movies = ({ label, navigation }) => {
  const [movies, setMovies] = useState(null);

  useLayoutEffect(() => {
    const unsubscribe =
      firestore()
        .collection("movies")
        .onSnapshot((snapshot) => {
          setMovies(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))
          )
        });
    return () => unsubscribe();
  }, []);
  return (
    <View style={{ padding: (20, 0) }}>
      <Text
        style={{
          color: '#fff',
          fontWeight: '700',
          fontSize: 23,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 15,
          marginLeft: 10,
        }}
      >
        {label}
      </Text>
      <ScrollView horizontal style={{ paddingLeft: 10 }}>
        {movies?.map((movie, item) => {
          return (
            <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
              navigation.navigate("ViewMovie", {
                id: movie.id,
              })
            }}>
              <View style={{ paddingRight: 9 }}>
                <Image
                  style={{
                    width: Math.round((Dimensions.get('window').width * 35) / 100),
                    height: 200,
                  }}
                  resizeMode='cover'
                  source={{ uri: movie.data.banner }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )
}

export default Movies;