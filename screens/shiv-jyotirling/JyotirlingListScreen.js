import  { useEffect, useState } from 'react'
import { View,Text,FlatList,StyleSheet,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import shivJyotirling from '../../assets/shivJyotirling.png'


export default function JyotirlingListScreen({navigation}) {
    const [jyotirling,setJyotirling] = useState([])

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL
    useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`${BASE_URL}/api/jyotirling`)
        const data = await res.json()
        setJyotirling(data)
        await AsyncStorage.setItem('jyotirlingData',JSON.stringify(data))
      }catch(err){
        console.log('Offline mode:',err)
        }
    }
      const loadSavedData = async()=>{
        const saved = await AsyncStorage.getItem('jyotirlingData')
        if(saved){
          setJyotirling(JSON.parse(saved))
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
        
                <Text style={styles.headerTitle}>शिव ज्योतिर्लिंग</Text>
              </View>

            <Image source={shivJyotirling}
                style={styles.img} />

        <FlatList data={jyotirling}
            keyExtractor={(item,index) => item._id || index.toString()}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.card}
                onPress={()=>navigation.navigate('JyotirlingDetail',{jyotirling:item})}>
                    <Text style={styles.text}>|| {item.name}-- 
                        राज्य: {item.state} ||
                    </Text>
                </TouchableOpacity>
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

  /* 🔥 HEADER */
  header:{
    flexDirection:'row',
    gap:40,
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
    borderRadius:20,
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
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
});

