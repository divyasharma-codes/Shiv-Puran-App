import React, { useEffect, useState } from 'react'
import * as Speech from 'expo-speech'
import shivChalisa from '../../assets/shivChalisa.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity, View,FlatList,Text,StyleSheet,Image } from 'react-native';

export default function ShivChalisaScreen({navigation}) {
    const [chalisa,setChalisa] = useState([]);
    const [isSpeaking,setIsSpeaking] = useState(false)

    const handleSpeech = () => {
      if(isSpeaking){
        Speech.stop()
        setIsSpeaking(false)
      }else{
        Speech.speak(chalisa.content,{
          language:'hi-IN',rate:0.8,pitch:1,
          onDone:()=>setIsSpeaking(false)
        });
      setIsSpeaking(true)
    }}

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL
    useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`${BASE_URL}/api/chalisa`)
        const data = await res.json()
        console.log(data)
        setChalisa(data)
        await AsyncStorage.setItem('chalisaData',JSON.stringify(data))
      }catch(err){
        console.log('Offline mode:',err)
        }
    }
      const loadSavedData = async()=>{
        const saved = await AsyncStorage.getItem('chalisaData')
        if(saved){
          console.log('loaded offline')
          setChalisa(JSON.parse(saved))
        }
      }
      loadSavedData()
    fetchData()
  }, []);
  return (
    <View style={styles.container} contentContainerStyle={{paddingBottom:100}}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={styles.back}>⬅</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>शिव चालीसा</Text>
            <TouchableOpacity onPress={handleSpeech} style={styles.soundBtn}>
                    <Text style={styles.sound}>{isSpeaking ? '🔇' : '🔊'}</Text>
                  </TouchableOpacity>
        </View>

        <Image source={shivChalisa} style={styles.img} />

        <FlatList data={chalisa}
            keyExtractor={(item)=>item._id}
                renderItem={({item})=>(
                    <Text style={styles.content}>{item.content}</Text>
                )} />  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    paddingTop:40,
    paddingHorizontal:15
  },
  header:{
    flexDirection:'row',
    paddingBottom:20,
    justifyContent:'space-between',
    alignItems:'center',
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
  soundBtn:{
    padding:12,
    backgroundColor:'2a2a4a',
    borderRadius:10,
    zIndex:10,
  },
  sound: {
    fontSize:24,
    color:'#fff',
  },
  img:{
    width:300,
    height:250,
    borderRadius:20,
    marginBottom:40,
    alignSelf:'center'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  content: {
    color: '#ccc',
    fontSize:16,
    lineHeight: 24,
  },
});