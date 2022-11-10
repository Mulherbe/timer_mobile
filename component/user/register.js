import React , { useState ,  useEffect } from 'react';
import { Button, ImageBackground,Text, View, Image, Dimensions,TextInput} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup'
import {styles} from '../../assets/css/style';


export  default function  Register ({ navigation , route}) {  
  
    const [erroCo, seterroCo ] = useState(false)


    const sendInscription = (email , password , firstname,lastname) => {
       
        fetch('https://gestion.fred-dev.fr/api/register', {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
            body: JSON.stringify({
              name:lastname,
              firstname:firstname, 
              email : email,
              password : password, 
                }
            )
              }).then((response) => response.json())
              .then((responseData) => {
                console.log(responseData)
                if(responseData.data.created_at){
                    navigation.navigate('Homescreen')
                }
              }).catch((error) => {
                  console.log(error);
              });
  
      }

    const loginValidationSchema = yup.object().shape({
        firstname: yup
        .string()
        .required('Nom est obligatoire'),
        
    lastname: yup
        .string()
        .required('Prenom est obligatoire'),
      email: yup
        .string()
        .email("Entrer un format d'email valide")
        .required('Email est obligatoire'),
        
      password: yup
        .string()
        .matches(/\w*[a-z]\w*/,  "Lettre miniscrule obligatoire")
        .matches(/\w*[A-Z]\w*/,  "Lettre majuscule obligatoire")
        // .matches(/\d/, "Numerp miniscrule obligatoire")
        .min(8, ({ min }) => `Le mot de passe doit contenir minimum ${min} caractères`)
        .required('Le mot de passe est obligatoire'),
        
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Les 2 mots de passe ne conresponde pas ')
        .required('Confimer votre mot de passe'),
    }) 
    return (
      
        <View style={styles.container} > 
       
       {/* <ImageBackground source={require('../assets/img/wallpaper2.jpg')}  style={styles.imageBackground}> */}
          
       {/* <Image source={require('../assets/img/logo6.png')} style = {{ width: '20%', height: 75 , marginTop: 50,marginLeft:'40%',marginRight:'40%'}} /> */}
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
              initialValues={{firstname:'',lastname:'', email: '', password: '' }}
              onSubmit={values => sendInscription(values.email , values.password,values.firstname,values.lastname  )}
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
                    name="firstname"
                    placeholder="Prenom"
                    style={styles.inputStyle}
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                  />
                   {(errors.firstname && touched.firstname) &&
                  <Text style={styles.errorText}>{errors.firstname}</Text>
                }

                <TextInput
                    name="lastname"
                    placeholder="Nom"
                    style={styles.inputStyle}
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                  />
                   {(errors.lastname && touched.lastname) &&
                  <Text style={styles.errorText}>{errors.lastname}</Text>
                }

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

                <TextInput
                    name="confirmPassword"
                    placeholder="Confirmer mot de passe"
                    style={styles.inputStyle}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                   {(errors.confirmPassword && touched.confirmPassword) &&
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                }
            
                  <Button
                    onPress={handleSubmit}
                    title="S'inscrire"
                    disabled={!isValid}
                    buttonStyle={{backgroundColor: '#9025E8',borderWidth: 2,borderColor: '#841CDA',borderRadius: 30, color:'black'}}
                    containerStyle={{color:'black',width:'60%',marginHorizontal: 50,marginTop: '20%', marginRight: "20%", marginLeft: "20%"}}
                    titleStyle={{color: 'white'}}
                  />
                                {erroCo &&
                  <Text style={styles.erroCoStyle}>Mot de passe ou Email éronnée </Text>
                } 
                   </View>
              
              )}
            </Formik>
              </View>
            </View>
          {/* </ImageBackground> */}
        </View>
    );
  }
