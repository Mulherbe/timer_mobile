import React , { useState ,  useEffect } from 'react';
import { StyleSheet, ImageBackground,Text, View, Image,TextInput} from 'react-native';
import { Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup'
import {styles} from '../../assets/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';


export  default function  Login ({ navigation , route}) {  
  
    const [erroCo, seterroCo ] = useState(false)
    let pass ="1234";
    let username= "test"

    
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('user')
        console.log(value)
        if(value !== null) {
            // value previously stored
        }
        } catch(e) {
        // error reading value
        }
    }
  
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
          // saving error
        }
      }
    const connexion = (username , password , erroCo) => {
      fetch('http://20.61.4.60:4000/api/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({    
            "user": {     
            "password": pass,    
            "username":username   
             } 
        })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.data)
            if(responseData.data){
                if(responseData.data.email){
              seterroCo(false);
              storeData(responseData.data)
              navigation.navigate('Homescreen' , {
                access_token :  responseData.access_token,
                id_user : responseData.id_user,
              } 
              )
            }

            }
          else {
            seterroCo(true);
          }
      }).catch((error) => {
          console.log(error);
      });
    }

    const loginValidationSchema = yup.object().shape({

      username: yup
        .string()
        .required('username obligatoire')
        ,
      password: yup
        .string()
        .min(1, ({ min }) => `Votre mot de passe fait minimum ${min} caractères `)
         .required('Mot de passe obligatoire')
        ,
    }) 
    return (
      
        <View style={styles.container} > 
       
       <ImageBackground source={require('../../assets/images/bg_clock.jpg')}  style={styles.imageBackground}>

       <Image source={require('../../assets/images/logo_clock.png')} style = {{ width: '40%', height: 150 , marginTop: 50,marginLeft:'30%',marginRight:'30%'}} />
              <View/>
              <View>
                <Text style ={styles.titleCo} >
                  Connexion
                </Text>
              </View> 

        <View>
        
        <View style={styles.loginContainer}>
   
          <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ username: '', password: '' }}
              onSubmit={values => connexion(values.username , values.password , erroCo )}
            >
               {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                errorCo
            }) => (

              <View style = {{ width: '80%' , marginRight: "10%", marginLeft: "10%",}}  >
                  <TextInput
                    name="username"
                    placeholder="username"
                    style={styles.inputStyle}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    keyboardType="username-address"
                  />
                   {(errors.username && touched.username) &&
                  <Text style={styles.errorText}>{errors.username}</Text>
                }

                  <TextInput
                    name="password"
                    placeholder="Mot de passe"
                    style={styles.inputStyle}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                   {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
            
                  <Button
                    onPress={handleSubmit}
                    title="Se connecter"
                    disabled={!isValid}
                    buttonStyle={{backgroundColor: '#fff3cd',borderWidth: 0.5,borderColor: '#black',borderRadius: 30, color:'black'}}
                    containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
                    titleStyle={{color: 'black'}}
                  />
                                {erroCo &&
                  <Text style={styles.erroCoStyle}>Mot de passe ou username éronnée </Text>
                } 
                  <Button
                    onPress= {getData}
                    title="Mot de passe oublier "
                    buttonStyle={{backgroundColor: 'white',borderWidth: 2,borderColor: 'white',borderRadius: 30, color:'black'}}
                    containerStyle={{color:'black',width:'80%',marginHorizontal: 50,marginTop: '10%', marginRight: "10%", marginLeft: "10%"}}
                    titleStyle={{    color: 'black'}}
                  />
                   </View>
              
              )}
            </Formik>
              </View>
            </View>
            </ImageBackground>

        </View>
    );
  }
