import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Hero = ({ myList, user }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 8,
      }}
    >
      <Image
        style={{ height: 135, width: '100%' }}
        resizeMode='contain'
        source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp' }}
      />
      <View
        style={{
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', padding: (0, 8), fontSize: 13, }}>
          Sci-Fi TV
        </Text>
        <View style={{ width: 3, height: 3, backgroundColor: '#e8e8e8', margin: (6, 0), borderRadius: 3, }} />
        <Text style={{ color: '#fff', padding: (0, 8), fontSize: 13, }}>
          Teen TV Shows
        </Text>
        <View style={{ width: 3, height: 3, backgroundColor: '#e8e8e8', margin: (6, 0), borderRadius: 3, }} />
        <Text style={{ color: '#fff', padding: (0, 8), fontSize: 13, }}>
          TV Horror
        </Text>
      </View>

      <View
        style={{
          width: '90%',
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {
          user?.list.includes("58BjRBKyy7Ld6eIVSZ2M") ? (
            <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5} onPress={() => {
              firestore().collection('users').doc(auth().currentUser.email).collection('myList').doc("58BjRBKyy7Ld6eIVSZ2M").delete()

              var list = user.list;
              list.splice(list.indexOf("58BjRBKyy7Ld6eIVSZ2M"), 1);

              firestore().collection('users').doc(auth().currentUser.email).update({
                list,
              })
            }}>


              <Feather name="check" size={24} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 13, marginTop: 3, }}>My List</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5} onPress={() => {
              firestore().collection('users').doc(auth().currentUser.email).collection('myList').doc("58BjRBKyy7Ld6eIVSZ2M").set({
                movieID: "58BjRBKyy7Ld6eIVSZ2M",
                banner: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F06%2Fstrangerthings_s3-2000.jpg&q=85"
              });

              var list = user.list;
              list.push("58BjRBKyy7Ld6eIVSZ2M")

              firestore().collection('users').doc(auth().currentUser.email).update({
                list,
              })
            }}>


              <Ionicons name="add-outline" size={28} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 13, marginTop: 3, }}>My List</Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: 142,
            height: 32,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name='ios-play' size={26} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 5, }}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5}>
          <Feather name='info' size={22} color='#FFF' />
          <Text style={{ color: '#fff', fontSize: 13, marginTop: 3, }}>Info</Text>
        </TouchableOpacity>

      </View>
    </View >
  )
}

export default Hero;