import {useState} from 'react'
import * as Speech from 'expo-speech'
import { StyleSheet ,ScrollView,Text,View,TouchableOpacity} from 'react-native'

function MandirDetailScreen({route,navigation}) {
    const {mandir} = route.params
    // console.log(mandir)
    const [isSpeaking,setIsSpeaking] = useState(false)

    const handleSpeech = () => {
      if(isSpeaking){
        Speech.stop()
        setIsSpeaking(false)
      }else{
        Speech.speak(mandir.content || mandir.description,{
          language:'hi-IN',rate:0.8,pitch:1,
          onDone:()=>setIsSpeaking(false)
        });
      setIsSpeaking(true)
    }}
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:100}}>
      <View style={styles.header}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={styles.back}>⬅</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>शिव मंदिर</Text>
              <TouchableOpacity onPress={handleSpeech} style={styles.soundBtn}>
              <Text style={styles.sound}>{isSpeaking ? '🔇' : '🔊'}</Text>
            </TouchableOpacity>
            </View>
        <Text style={styles.name}>नाम : {mandir.name}</Text>
        <Text style={styles.desc}>कहानी : {mandir.description}</Text>
    </ScrollView>
  )
}

export default MandirDetailScreen

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    paddingTop:40,
    paddingHorizontal:15
  },
  header:{
    flexDirection:'row',
    marginBottom:40,
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
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
  },
  desc: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
});