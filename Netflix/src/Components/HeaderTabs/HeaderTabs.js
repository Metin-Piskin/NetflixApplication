import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

const HeaderTabs = ({ navigation }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: (0, 10, 0, 25),
        width: '100%',
      }}
    >
      <TouchableOpacity activeOpacity={0.5}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff', }}>TV Shows</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff', }}>Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={() => {
        navigation.navigate("MyList")
      }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff', }}>My List</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderTabs;