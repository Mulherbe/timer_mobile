import React , { useState ,  useEffect } from 'react';
import {StyleSheet,View,ImageBackground,Text,Image} from 'react-native';
import {styles} from '../../assets/css/style';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clock from './clock';

export  default function Dashboard ({ navigation , route}) {


    const getData = async () => { 
        try {
        const value = await AsyncStorage.getItem('user')
     
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
       <View style = {{ width: '40%', height: 150 , marginTop: 50,marginLeft:'25%',marginRight:'30%'}}>
        <Clock /> 
        </View>        
         <Button 
            title="Start "
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            // onPress= {}

          />
          <Button 
            title="Stop"
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '10%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            // onPress= {}

          />
        </ImageBackground>


    </View>
    );
  }







