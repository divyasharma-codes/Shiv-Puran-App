import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import shivPuran from '../../assets/ShivPuran.jpg'
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Image} from 'react-native';

const SahitaScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`${BASE_URL}/api/sahita`)
        const data = await res.json()
        setData(data)
        await AsyncStorage.setItem('sahitaData',JSON.stringify(data))
      }catch(err){
        console.log('Offline mode:',err)
        }
    }
      const loadSavedData = async()=>{
        const saved = await AsyncStorage.getItem('sahitaData')
        if(saved){
          setData(JSON.parse(saved))
        }
      }
      loadSavedData()
    fetchData()
  }, []);
     return (
    <View style={styles.container}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.back}>⬅</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>शिव पुराण</Text>
      </View>

        <Image source={shivPuran} style={styles.img} />
      {/* 🔥 SAHITA LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {!data ? (
                  <Text style={styles.loading}>Loading...</Text>
                ) : (
                  <>
        <View style={styles.listContainer}>
          {data.map(item => (
            <TouchableOpacity
              key={item._id}
              style={styles.card}
              onPress={() => navigation.navigate('ChapterScreen',{sahitaId:item._id})}
            >
              <Text style={styles.cardText}>|| {item.name} -- {item.description} ||</Text>
            </TouchableOpacity>
          ))}
        </View>
        </>
                )}
      </ScrollView>

      </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    color:'#fff',
    marginTop:10,
  },
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

  /* 🔥 LIST */
  listContainer: {
    padding: 15,
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

  cardText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ccc',
  },
});



export default SahitaScreen;