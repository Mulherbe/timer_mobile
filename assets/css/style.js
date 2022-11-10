
import { StyleSheet,Dimensions} from 'react-native';
let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    imageBackground: {
        width:'100%',
        height: ScreenHeight
      },  
      inputStyle:{
        backgroundColor:'white',
        borderRadius:10 ,
        borderWidth: 0.5,
        height:50,
        paddingLeft:10,
        marginTop: 15
      },
    
      input: {
        height: 48,
        width: '80%',
        padding: 8,
        margin: 16,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
      },
      errorText:{
        fontSize: 10,
        color: 'red',
        marginTop:5
      },
      erroCoStyle:{
        fontSize: 15,
        color: 'red',
        marginTop:5,
        textAlign:'center'
      },
      titleCo:{
        marginTop:20,
        marginBottom:20,
        fontSize: 25,
        textAlign:'center'

      }
      

    
});

export { styles }