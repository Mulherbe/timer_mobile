import React , { useState ,  useEffect } from 'react';
import {StyleSheet,View,ImageBackground,Text,Image} from 'react-native';
import {styles} from '../../assets/css/style';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clock from './clock';

export  default function Dashboard ({ navigation , route}) {
  const [user_id, setUser_id ] = useState(route.params.id_user)

  console.log("date",new Date().toLocaleString( {timeZone: "Europe/Paris"}))
    // const getData = async () => { 
    //     try {
    //       setUser_id(await AsyncStorage.getItem('user'))
    //       console.log(user_id) 
     
    //     } catch(e) {
    //     // error reading value
    //     }
    // }
    const postClock = () => {

      fetch('http://20.61.4.60:4000/api/workingtimes/add/' + user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({    
            "workingtime": {     
              "start": new Date(),     
              "end":  "2001-02-16 20:38:40"
            }
        })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
      }).catch((error) => {
          console.log(error);
      });
    }

    

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
    <View >

        <ImageBackground source={require('../../assets/images/bg_clock.jpg')}  style={styles.imageBackground}>
       <View style = {{ width: '40%', height: 150 , marginTop: 50,marginLeft:'25%',marginRight:'30%'}}>
        {/* <Clock />  */}
        </View>        
         <Button 
            title="Start "
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            onPress= {postClock}

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







