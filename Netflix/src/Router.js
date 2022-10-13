import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Login from './Pages/Auth/Login';
import Sign from './Pages/Auth/Sign';
import Home from './Pages/Home';
import ViewMovie from './Pages/ViewMovie';
import MyList from './Pages/MyList';
import SearchScreen from './Pages/Search';
import Splash from './Pages/Splash';
import Start from './Pages/Start';

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#5B5B5B",
                headerShown: false,
                tabBarStyle: { backgroundColor: '#000' }
            }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} style={{ marginBottom: -10 }} />
            }} />
            <Tab.Screen name='Coming Soon' component={Home} options={{
                tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} style={{ marginBottom: -10 }} />
            }} />
            <Tab.Screen name='Downloads' component={Home} options={{
                tabBarIcon: ({ color }) => <AntDesign name="download" size={24} color={color} style={{ marginBottom: -10 }} />
            }} />
        </Tab.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Start' component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign" component={Sign} />
        </Stack.Navigator>
    )
}

const Router = () => {
    const [userSession, setUserSession] = useState();

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            setUserSession(!!user);
        })
    }, []);
    return (
        <NavigationContainer>
            {
                !userSession ? (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='AuthStack' component={AuthStack} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='BottomTab' component={BottomTab} />
                        <Stack.Screen name="ViewMovie" component={ViewMovie} />
                        <Stack.Screen name="MyList" component={MyList} />
                        <Stack.Screen name="Search" component={SearchScreen} />
                        <Stack.Screen name="Splash" component={Splash} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    )
}
export default Router;