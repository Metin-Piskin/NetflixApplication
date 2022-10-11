import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are mandatory");
      setPassword("");
      setEmail("");
      setLoading(false);
      return;
    }

    auth().signInWithEmailAndPassword(email, password).then(authUser => {
      navigation.replace("Home");
      setPassword('');
      setEmail("");
      console.log(authUser)
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      alert(err)
    })
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'rgba(0,0,0,0.5)'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#000'
        }}
      >
        <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }}
          resizeMode="cover"
          style={{
            flex: 1,
            height: Dimensions.get("window").height
          }}
        />
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80%'
            }}
          >
            <View
              style={{
                height: 400,
                width: '90 %',
                backgroundColor: 'black',
                flexDirection: 'column',
                borderRadius: 20,
                padding: 20,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 10,
                  textAlign: 'left'
                }}>
                Login
              </Text>
              <TextInput
                style={{
                  width: '95 %',
                  height: 50,
                  border: 'none',
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor: '#333333',
                  color: 'white',
                  marginTop: 10,
                }}
                placeholder="Enter your email"
                placeholderTextColor='grey'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={{
                  width: '95 %',
                  height: 50,
                  border: 'none',
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor: '#333333',
                  olor: 'white',
                  marginTop: 10,
                }}
                placeholder="Password"
                placeholderTextColor='grey'
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={{
                  width: '95 %',
                  height: 50,
                  color: 'white',
                  borderRadius: 10,
                  border: 'none',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: '#E7442E',
                }}
                onPress={login}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    color: 'white',
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.5} onPress={() => navigation.navigate("Sign")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#ccc',
                    margin: 15,
                    textAlign: 'center'
                  }}
                >
                  New to Netflix ? Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default Login;