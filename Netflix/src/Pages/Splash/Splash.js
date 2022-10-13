import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("BottomStack")
            } else {
                navigation.replace("Login")
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        </View>
    )
}

export default Splash