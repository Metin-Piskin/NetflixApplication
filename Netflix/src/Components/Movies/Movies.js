import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';

const Movies = ({ label, item }) => {
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
        {
          item.map((movie, item) => {
            return (
              <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                navigation.navigate("ViewMovie", {
                  id: movie.id,
                })
              }}>
                <View style={{ paddingRight: 9 }}>
                  <Image
                    style={{
                      width: 100,//Math.round((Dimensions.get('window').width * 35) / 100),
                      height: 200,
                    }}
                    resizeMode='cover'
                    source={{uri: movie.banner}}
                  />
                </View>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </View>
  )
}

export default Movies;