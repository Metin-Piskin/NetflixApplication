import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';



const Start = ({ navigation }) => {
    return (
        <PagerView
            style={styles.pagerView}
            initialPage={0}
        >
            <View key="1" style={styles.container}>
                <Image
                    source={require('../../Assets/Logonetflix.png')}
                    style={styles.logo}
                />
            </View>
            <View key="2" style={styles.innercontainer}>
                <View style={styles.headerconteiner}>
                    <Image
                        source={require('../../Assets/Logonetflix.png')}
                        style={styles.pagelogo}
                    />
                    <TouchableOpacity style={styles.helpbuttom}>
                        <Text style={styles.helptext}>Help</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../Assets/page1.png')}
                    style={styles.pageImage}
                />
                <Text style={styles.otext}>Watch on any device</Text>
                <Text style={styles.ttext}>Stream on your phone, tablet, laptopand TV without playing more</Text>
            </View>
            <View key="3" style={styles.innercontainer}>
                <View style={styles.headerconteiner}>
                    <Image
                        source={require('../../Assets/Logonetflix.png')}
                        style={styles.pagelogo}
                    />
                    <TouchableOpacity style={styles.helpbuttom}>
                        <Text style={styles.helptext}>Help</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../Assets/page2.png')}
                    style={styles.pageImage}
                />
                <Text style={styles.otext}>3, 2, 1,... download!</Text>
                <Text style={styles.ttext}>Always have something to Watch offline.</Text>
            </View>
            <View key="4" style={styles.innercontainer}>
                <View style={styles.headerconteiner}>
                    <Image
                        source={require('../../Assets/Logonetflix.png')}
                        style={styles.pagelogo}
                    />
                    <TouchableOpacity style={styles.helpbuttom}>
                        <Text style={styles.helptext}>Help</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../Assets/page3.png')}
                    style={styles.pageImage}
                />
                <Text style={styles.otext}>No pesky contracts. </Text>
                <Text style={styles.ttext}>cancel anytime</Text>
            </View>
            <View key="5" style={styles.innercontainer}>
                <ImageBackground
                    source={require('../../Assets/page4.png')}
                    style={styles.ımagebackground}
                >
                    <LinearGradient
                        style={{ height: '100%', width: '100%' }}
                        locations={[0, 0.2, 0.5, 0.94]}
                        colors={[
                            'rgba(0,0,0,1)',
                            'rgba(0,0,0,0.5)',
                            'rgba(0,0,0,0.5)',
                            'rgba(0,0,0,1)'
                        ]}
                    >
                        <View style={styles.headerconteiner}>
                            <Image
                                source={require('../../Assets/Logonetflix.png')}
                                style={styles.pagelogo}
                            />
                            <TouchableOpacity style={styles.helpbuttom}>
                                <Text style={styles.helptext}>Help</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={styles.otext}>How do I watch?</Text>
                            <Text style={styles.ttext}>Members that subscribe to Netflix can watch here in the app</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.loginbutton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.Logintext}>Login</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </PagerView>
    )
}

export default Start;

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 261,
        height: 79,
        resizeMode: 'contain'
    },
    innercontainer: {
        alignItems: 'center'
    },
    headerconteiner: {
        flexDirection: 'row',
    },
    pagelogo: {
        width: 130,
        height: 39,
        resizeMode: 'contain',
        marginTop: 35,
        flex: 1
    },
    helpbuttom: {
        justifyContent: 'center',
        top: 14,
        right: 25
    },
    helptext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    pageImage: {
        width: 266,
        height: 250,
        resizeMode: 'contain',
        marginTop: 75,
    },
    otext: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    ttext: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 21,
        maxWidth: 300
    },
    ımagebackground: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    loginbutton: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'red',
        zIndex: 1,
        bottom: 90,
        right: 30,
        padding: 10,
        borderRadius: 25
    },
    Logintext: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    }
});