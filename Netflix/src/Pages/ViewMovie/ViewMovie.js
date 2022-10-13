import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { useNavigation } from '@react-navigation/native';

import Header from '../../Components/Header';


const ViewMovie = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        firestore().collection('users').doc(auth().currentUser.email).onSnapshot(doc => {
            if (doc.exists) {
                setUser(doc.data())
            }
        })

    }, [auth().currentUser])

    useEffect(() => {
        firestore().collection('movies').doc(route.params.id).onSnapshot(doc => {
            setMovie(doc.data());
        })

        setLoading(false);
    }, [route])

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });


    return !loading ? (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
                <Header login={true} goBack={navigation.goBack} navigation={navigation} />
                <Video source={{
                    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }}
                    poster={'https://cazkolik.com/storage/gorseller/netflix-sinema-ve-televizyon-sektoru-calisanlarina-4-milyon-tl-destek-paketi-ac-cazkolik-20200531_1201.jpeg'}
                    posterResizeMode={'contain'}
                    controls={true}
                    style={{
                        height: 225, marginTop: 15
                    }}
                />
                <Text style={{
                    color: 'white',
                    fontSize: 24,
                    margin: 10,
                    fontFamily: "Montserrat_700Bold",
                }}>{movie?.name}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -17,
                    }}
                >
                    <Text
                        style={{
                            color: '#a2a2a2',
                            backgroundColor: '#373737',
                            padding: 2,
                            borderRadius: 5,
                            width: 38,
                            textAlign: 'center',
                            margin: 15,
                        }}
                    >
                        {movie?.ageLimit}
                    </Text>
                    <Text style={{ color: '#a2a2a2', margin: 5 }}>{movie?.yearOfRelease}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            width: '95%',
                            height: 32,
                            borderRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 10,
                        }}
                        activeOpacity={0.5}
                    >
                        <Ionicons name='ios-play' size={26} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 5 }}>Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#262626',
                            width: '95%',
                            height: 32,
                            borderRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        activeOpacity={0.5}
                    >
                        <Feather name='download' size={24} style={{ color: 'white', margin: 4 }} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: 'white',
                                paddingLeft: 5,
                            }}
                        >
                            Download
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        color: 'white',
                        width: '98%',
                        marginLeft: 10,
                        margin: 10,
                        fontWeight: '100',
                        fontFamily: "Montserrat_300Light",
                        lineHeight: 20,
                        marginTop: 25,
                    }}
                >
                    {movie?.description}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: (10, 0, 5, 3),
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        width: '99%',
                    }}
                >
                    {
                        movie?.tags.map((tag, i) => {
                            if (i + 1 == movie?.tags.length) {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        key={i}
                                    >
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontFamily: "Montserrat_400Regular",
                                            }}
                                        >{tag}</Text>
                                    </View>
                                )
                            } else {
                                return (
                                    (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                            key={i}
                                        >
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontFamily: "Montserrat_400Regular",
                                                }}
                                            >{tag}</Text>
                                            <View
                                                style={{
                                                    margin: 10,
                                                    backgroundColor: 'white',
                                                    height: 2,
                                                    width: 2,
                                                }}
                                            />
                                        </View>
                                    )
                                )
                            }
                        })
                    }
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 20,
                        alignItems: 'center',
                    }}
                >
                    {
                        movie && user?.list.includes(movie.id) ? (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 30,
                                    marginTop: 20,
                                }}
                                activeOpacity={0.5}
                                onPress={() => {
                                    firestore().collection('users').doc(auth().currentUser.email).collection('myList').doc(movie.id).delete()

                                    var list = user.list;
                                    list.splice(list.indexOf(movie.id), 1);

                                    firestore().collection('users').doc(auth().currentUser.email).update({
                                        list,
                                    })
                                }}>
                                <Feather name="check" size={35} color="white" />
                                <Text
                                    style={{
                                        color: 'white',
                                        fontFamily: "Montserrat_300Light",
                                        fontSize: 15,
                                    }}
                                >My List</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 30,
                                    marginTop: 20,
                                }}
                                activeOpacity={0.5}
                                onPress={() => {
                                    firestore().collection('users').doc(auth().currentUser.email).collection('myList').doc(movie.id).set({
                                        movieID: movie.id,
                                        banner: movie.banner
                                    });

                                    var list = user.list;
                                    list.push(movie.id)

                                    firestore().collection('users').doc(auth().currentUser.email).update({
                                        list,
                                    })

                                }}>
                                <Ionicons name="add-outline" size={35} color="white" />
                                <Text
                                    style={{
                                        color: 'white',
                                        fontFamily: "Montserrat_300Light",
                                        fontSize: 15,
                                    }}>My List</Text>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 30,
                            marginTop: 20,
                        }}
                        activeOpacity={0.5}>
                        <AntDesign name="like2" size={30} color="white" style={{ marginBottom: 7 }} />
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: "Montserrat_300Light",
                                fontSize: 15,
                            }}
                        >Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 30,
                            marginTop: 20,
                        }}
                        activeOpacity={0.5}>
                        <AntDesign name="sharealt" size={27} color="white" style={{ marginBottom: 7 }} />
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: "Montserrat_300Light",
                                fontSize: 15,
                            }}
                        >Share</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    ) : (
        <ScrollView style={{ flex: 1, backgroundColor: '#000' }} />
    )
}

export default ViewMovie