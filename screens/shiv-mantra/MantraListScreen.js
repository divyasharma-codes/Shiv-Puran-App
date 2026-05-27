import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import shivMantra from '../../assets/shivMantra.jpg'
import { FlatList, TouchableOpacity, View ,StyleSheet,Text,Image} from 'react-native'

function MantraListScreen({navigation}) {
    const [mantra,setMantra] = useState([])

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL
    useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`${BASE_URL}/api/mantra`)
        const data = await res.json()
        setMantra(data)
        await AsyncStorage.setItem('mantraData',JSON.stringify(data))
      }catch(err){
        console.log('Offline mode:',err)
        }
    }
      const loadSavedData = async()=>{
        const saved = await AsyncStorage.getItem('mantraData')
        if(saved){
          setMantra(JSON.parse(saved))
        }
      }
      loadSavedData()
    fetchData()
  }, []);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={styles.back}>⬅</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>शिव मंत्र</Text>
        </View>

        <Image source={shivMantra} style={styles.img} />

        <FlatList data={mantra}
            keyExtractor={(item,index) => item._id || index.toString()}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.card}
                onPress={()=>navigation.navigate('MantraDetail',{mantra:item})}>
                    <Text style={styles.text}>|| {item.title} ||</Text>
                </TouchableOpacity>
            )} />
    </View>
  )
}

export default MantraListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    paddingTop:40,
    paddingHorizontal:15,
  },

  /* 🔥 HEADER */
  header:{
    flexDirection:'row',
    gap:50,
    alignItems:'center',
    marginBottom:40,
  },
  back: {
    fontSize: 22,
    color: '#fff',
  },


  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  img:{
    width:300,
    height:300,
    borderRadius:30,
    marginBottom:40,
    alignSelf:'center'
  },

  /* 🔥 CARD */
  card: {
    backgroundColor: '#2a2a4a',
    padding: 40,
    borderRadius: 12,
    marginBottom:15,
    alignItems:'center',
    alignSelf:'center',
    width:'100%'
  },

  text: {
    fontSize:20,
    fontWeight: '500',
    color: '#fff',
  },
});


