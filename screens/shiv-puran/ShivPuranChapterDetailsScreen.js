import React, { useEffect, useState } from 'react';
import * as Speech from 'expo-speech'
import { View, Text,TouchableOpacity,StyleSheet,
  SafeAreaView,ScrollView,ActivityIndicator,} from 'react-native';

const ChapterDetailScreen = ({route,navigation}) => {
  const {chapterId} = route.params
  // console.log(chapterId)
  const [chapter, setChapter] = useState(null);
  const [loading,setLoading] = useState(true);

  const [isSpeaking,setIsSpeaking] = useState(false)
  const handleSpeech = () => {
            if(isSpeaking){
              Speech.stop()
              setIsSpeaking(false)
            }else{
              Speech.speak(chapter.content,{
                language:'hi-IN',rate:0.8,pitch:1,
                onDone:()=>setIsSpeaking(false)
              });
            setIsSpeaking(true)
          }}

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL
  useEffect(() => {
    fetch(`${BASE_URL}/api/chapter/detail/${chapterId}`)
      .then((res)=> res.json())
      .then(data => {
        // console.log("📦 DETAIL API:", data);

        const finalData = data?.data || data;
        setChapter(finalData);
        setLoading(false)
      })
      .catch(err =>{
         console.log(err)
         setLoading(false)
      });

  }, [chapterId]);

        if(loading){
          return (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size='large' color='#fff' />
              <Text style={styles.loadingText}>Loading Chapter...</Text>
            </View>
          )
        }

  return (
    <View style={styles.container}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.back}>⬅</Text>
        </TouchableOpacity>

        <Text style={styles.title}>शिव पुराण</Text>
        <TouchableOpacity onPress={handleSpeech} style={styles.soundBtn}>
                <Text style={styles.sound}>{isSpeaking ? '🔇' : '🔊'}</Text>
              </TouchableOpacity>
      </View>

      {/* 🔥 CONTENT */}
      <ScrollView style={styles.content}  contentContainerStyle={{flexGrow:1,paddingBottom:100}}>
        {!chapter ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <>
            <Text style={styles.chapterTitle}>
              {chapter.title || "Chapter"}
            </Text>

            <Text style={styles.chapterText}>
              {chapter.content || "No Content"}
            </Text>
          </>
        )}
      </ScrollView>

    </View>
  );
};

export default ChapterDetailScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0a0a23',
  },
  loadingText: {
    color:'#fff',
    marginTop:10,
  },
  container: {
   flex: 1,
    backgroundColor: '#0a0a23',
    paddingTop:40,
    paddingHorizontal:15
  },

  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  back: {
    fontSize: 22,
    color: '#fff',
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  content: {
    padding: 15,
    color:'#ccc'
  },

  chapterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },

  chapterText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },

  loading: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});