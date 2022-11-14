import React , { useState ,  useEffect } from 'react';
import { StyleSheet, View ,ScrollView} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export  default function workingTiimeTab (props) {

  const [tableHead, setTableHead ] = useState(['Numéro','Start', 'End','Total'])
  const [tableData, setTableData ] = useState([])
  const [lastDataTab, setLastDataTab] = useState()
  const [dataStart, setDataStart] = useState([])
  const [datatotal, setDatatotal] = useState([])
  const [totalCalcul,setTotalCalcul] = useState()

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
  }
  

  const getLastDataOnMount = () =>{
    let dateStop = new Date();
    fetch('http://20.61.4.60:4000/api/workingTimesByUserId/' + props.user_id, {
      method: 'GET',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
      }).then((response) => response.json())
      .then((responseData) => {
        construcArray(responseData.data.reverse())     
    }).catch((error) => {
        console.log(error);
    });
  }
  const construcArray =(tab) => {
   for (let i = 0; i < tab.length; i++) {
    let dateStart = new Date(tab[i].start).getDate() + "/" + (new Date(tab[i].start).getMonth() + 1) + "/" + new Date(tab[i].start).getFullYear()+"\n"+new Date(tab[i].start).getHours()+":"+new Date(tab[i].start).getMinutes()+":"+new Date(tab[i].start).getSeconds()

    let dateEnd = new Date(tab[i].end).getDate() + "/" + (new Date(tab[i].end).getMonth() + 1) + "/" + new Date(tab[i].end).getFullYear()+"\n"+new Date(tab[i].end).getHours()+":"+new Date(tab[i].end).getMinutes()+":"+new Date(tab[i].end).getSeconds()
    
    
    let dateCalcul = new Date(tab[i].end)- new Date(tab[i].start)
    let titi =  msToTime(dateCalcul)

      //let total = parseFloat(totalCalcul).toPrecision(1)

      datatotal.push([tab[i].id,dateStart,dateEnd,titi ]);
      setTotalCalcul(0)

     }
     setTableData(datatotal)
  }
  useEffect(() => {
    getLastDataOnMount();
  }, []);
    return (
      <View style={styles.container}>
        <ScrollView >
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});