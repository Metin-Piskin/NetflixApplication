import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StatusBar, Dimensions, ImageBackground, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Header from '../../Components/Header';
import Hero from '../../Components/Hero';
import Movies from '../../Components/Movies';
import HeaderTabs from '../../Components/HeaderTabs';

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firestore().collection('users').doc(auth().currentUser.email).onSnapshot(doc => {
      if (doc.exists) {
        setUser(doc.data())
      }
    })

  }, [auth().currentUser])



  return (
    <>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'rgba(0,0,0,0.5)'} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#000'
        }}
      >
        <ImageBackground
          style={{
            width: '100%',
            height: (Dimensions.get('window').height * 81) / 100
          }}
          source={{ uri: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/05/FSkCESUWYAAThYb.jpg' }}
        >
          <LinearGradient
            style={{ height: '101%' }}
            locations={[0, 0.2, 0.5, 0.94]}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,1)'
            ]}
          >
            <Header login={true} navigation={navigation} />
            <HeaderTabs navigation={navigation} />
            <Hero user={user} />
          </LinearGradient>
        </ImageBackground>

        <Fragment>
          <Movies label='Popular on Netflix' navigation={navigation} />
          <Movies label='US Movies' navigation={navigation} />
          <Movies label='Crime TV Shows' navigation={navigation} />
        </Fragment>

      </ScrollView>
    </>
  )
}

export default Home;