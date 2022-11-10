import React , { useState ,  useEffect } from 'react';
import { StyleSheet, ImageBackground,Text, View, Image,TextInput} from 'react-native';
import { Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup'
 import {styles} from '../../assets/css/style';


export  default function  Login ({ navigation , route}) {  
  
    const [erroCo, seterroCo ] = useState(false)

    const connexion = (email , password , erroCo) => {
      fetch('https://gestion.fred-dev.fr/api/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({ email :  'email@email.fr' , password : 'password',})
        }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)

            if(responseData.access_token){
              seterroCo(false);

              navigation.navigate('Dashboard' , {
                access_token :  responseData.access_token,
                id_user : responseData.id_user,
              } 
              )
            }
          else {
            seterroCo(true);
          }
      }).catch((error) => {
          console.log(error);
      });
    }

    const loginValidationSchema = yup.object().shape({

      email: yup
        .string()
        // .email("Entrer un format de mail valide ")
        // .required('Email obligatoire')
        ,
      password: yup
        .string()
        // .min(8, ({ min }) => `Votre mot de passe fait minimum ${min} caractères `)
        // .required('Mot de passe obligatoire')
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
              initialValues={{ email: '', password: '' }}
              onSubmit={values => connexion(values.email , values.password , erroCo )}
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
                    name="email"
                    placeholder="Email"
                    style={styles.inputStyle}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                   {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
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
                  <Text style={styles.erroCoStyle}>Mot de passe ou Email éronnée </Text>
                } 
                  <Button
                    // onPress= {() =>navigation.navigate('MdpOublie')}
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
