import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StatusBar, ScrollView, Image, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";

import Header from '../../Components/Header';

const Search = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [results2, setResults2] = useState(null);

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    useEffect(() => {
        firestore().collection('movies').onSnapshot(snapshot => {
            setResults(snapshot.docs.map((doc) => doc.data()))
        })

        setResults2(results);
    }, [])

    useEffect(() => {
        firestore().collection('movies').onSnapshot(snapshot => {
            setResults(snapshot.docs.map((doc) => doc.data()))
        })

        if (results != undefined) {
            const finalResults = results.filter(result => {
                return result.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            })

            setResults2(finalResults);
        }
    }, [search])
    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
                <Header login={true} goBack={navigation.goBack} />
                <View style={{ width: '100%', justifyContent: 'center', marginTop: 5 }}>
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: '#333333',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingLeft: 0,
                            paddingRight: 7,
                            margin: 20,
                            marginLeft: 5,
                        }}
                    >
                        <MaterialIcons name="search" size={30} color="#B1B1B1" style={{ margin: 10 }} />
                        <TextInput
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                margin: 5,
                            }}
                            value={search}
                            onChangeText={(text) => setSearch(text)} placeholderTextColor="#7f7f7f"
                            placeholder="Search for a show, movie, genre etc."
                        />
                        <TouchableOpacity activeOpacity={0.5}>
                            <MaterialCommunityIcons name="microphone" size={30} color="#b1b1b1" style={{ margin: 10, }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    results2 && (
                        <>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 28,
                                    margin: 20,
                                    marginTop: 10,
                                    marginLeft: 25,
                                    fontFamily: "Montserrat_600SemiBold",
                                    fontWeight: '600',
                                }}
                            >
                                Top Searches
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    padding: 10,
                                    justifyContent: 'center',
                                }}
                            >
                                {results2.map((movie, item) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                            navigation.navigate("ViewMovie", {
                                                id: movie.id,
                                            })
                                        }}>
                                            <View style={{ paddingRight: 9 }}>
                                                <Image
                                                    style={{
                                                        width: Math.round((Dimensions.get('window').width * 29.5) / 100),
                                                        height: 200,
                                                    }}
                                                    resizeMode='cover'
                                                    source={{ uri: movie.banner }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </>
                    )
                }
            </ScrollView>
        </>
    )
}

export default Search