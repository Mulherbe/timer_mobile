import React , { useState ,  useEffect } from 'react';
import {StyleSheet,View,ImageBackground,Dimensions,Image} from 'react-native';
import {styles} from '../../assets/css/style';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  default function Dashboard ({ navigation , route}) {


    const getData = async () => { 
        try {
        const value = await AsyncStorage.getItem('user')
        if(value !== null) {
            navigation.navigate('Dashboard')
        }
        } catch(e) {
        // error reading value
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
    <View >
        <ImageBackground source={require('../../assets/images/bg_clock.jpg')}  style={styles.imageBackground}>
        <Image source={require('../../assets/images/logo_clock.png')} style = {{ width: '50%', height: 190 , marginTop: 50,marginLeft:'25%',marginRight:'25%'}} />
          <Button 
            title="Connexion "
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            onPress= {() =>navigation.navigate('Login')}

          />
          <Button 
            title="Inscription "
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '10%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            onPress= {() =>navigation.navigate('Register')}

          />
        </ImageBackground>


    </View>
    );
  }







