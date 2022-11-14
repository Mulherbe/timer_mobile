import React , { useState ,  useEffect } from 'react';
import {StyleSheet,View,ImageBackground,Text,Image} from 'react-native';
import {styles} from '../../assets/css/style';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clock from './clock';
import WorkingTiimeTab from './workingTiimeTab';

export  default function Dashboard ({ navigation , route}) {

  const [user_id, setUser_id ] = useState(route.params.id_user)
  const [lastDataMount, setLastDataMount] = useState(route.params.id_user)
  const [lastDataTab, setLastDataTab] = useState()

  //console.log("date",new Date().toLocaleString( {timeZone: "Europe/Paris"}))
    // const getData = async () => { 
    //     try {
    //       setUser_id(await AsyncStorage.getItem('user'))
    //       console.log(user_id) 
     
    //     } catch(e) {
    //     // error reading value
    //     }
    // }

    const getLastDataOnMount = () =>{
      let dateStop = new Date();
      fetch('http://20.61.4.60:4000/api/clocksByUser/' + user_id, {
        method: 'GET',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        }).then((response) => response.json())
        .then((responseData) => {
          setLastDataTab(responseData)
          //console.log(lastDataTab)
         // console.log(responseData.data.slice(-10))
          setLastDataMount(responseData.data.slice(-1)[0].status)
      }).catch((error) => {
          console.log(error);
      });
    }
    const postWorkingTime = (dateStart,dateStop) => {

      fetch('http://20.61.4.60:4000/api/workingtimes/add/' + user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({    
            "workingtime": {     
              "start": dateStart,     
              "end":   dateStop
            }
        })
        }).then((response) => response.json())
        .then((responseData) => {
          getLastDataOnMount();
          console.log('create working time')
      }).catch((error) => {
          console.log(error);
      });
    }
    const postClockStart = () => {

      fetch('http://20.61.4.60:4000/api/clock/' + user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({    
             "clock": {    
              "time": new Date(),    
              "status": false,  
              }
          })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            getLastDataOnMount()
      }).catch((error) => {
          console.log(error);
      });
    }
    const postClockStop = (dateStop) => {

      fetch('http://20.61.4.60:4000/api/clock/' + user_id, {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({    
          "clock": {     
            "time": dateStop,    
            "status": true,  
            }
        })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
      }).catch((error) => {
          console.log(error);
      });
    }
    
    const getLastData = () =>{
      let dateStop = new Date();
      fetch('http://20.61.4.60:4000/api/clocksByUser/' + user_id, {
        method: 'GET',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        }).then((response) => response.json())
        .then((responseData) => {
        let  dateStart = responseData.data.slice(-1)
        postClockStop(dateStop)
        postWorkingTime(dateStart[0].time,dateStop)
        //console.log(responseData.data.slice(-1))
      }).catch((error) => {
          console.log(error);
      });
    }

    useEffect(() => {
      getLastDataOnMount();
    }, []);

    return (
    <View >
        <ImageBackground source={require('../../assets/images/bg_clock.jpg')}  style={styles.imageBackground}>
       <View style = {{ width: '40%', height: 150 , marginTop: 50,marginLeft:'25%',marginRight:'30%'}}>
        <Clock /> 

        </View>        
        {lastDataMount ?  
        <Button 
            title="Start "
            buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
            containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
            titleStyle={{color: 'black'}}
            onPress= {postClockStart  }
          />
        
        :           
        <Button 
        title="Stop"
        buttonStyle={{backgroundColor: '#fff3cd',borderWidth:  0.5,borderColor: 'black',borderRadius: 30, color:'black'}}
        containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
        titleStyle={{color: 'black'}}
        onPress= {getLastData}

      />

        }
       <WorkingTiimeTab user_id={user_id} />


        </ImageBackground>
    </View>
    );
  }







