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
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    firestore().collection('users').doc(auth().currentUser.email).onSnapshot(doc => {
      if (doc.exists) {
        setUser(doc.data())
      }
    })

  }, [auth().currentUser])

  useLayoutEffect(() => {
    const unsubscribe =
      firestore()
        .collection("movies")
        .onSnapshot((snapshot) =>
          setMovies(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    return unsubscribe;
  }, []);

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
          source={{ uri: 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg' }}
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
        {
          movies && (
            <Fragment>
              <Movies label='Popular on Netflix' item={movies} />
              <Movies label='US Movies' item={movies} />
              <Movies label='Crime TV Shows' item={movies} />
            </Fragment>
          )
        }
      </ScrollView>
    </>
  )
}

export default Home;