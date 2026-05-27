// screens/ChapterListScreen.jsx
import { useEffect, useState } from 'react';
import { View,Text,TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,} from 'react-native';

const ChapterListScreen = ({route,navigation}) => {
  const {sahitaId} = route.params
  // console.log(sahitaId)
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (!sahitaId) {
      console.log("❌ sahitaId undefined");
      return;
    }

    console.log("✅ SAHITA ID:", sahitaId);

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL
    fetch(`${BASE_URL}/api/chapter/${sahitaId}`)
      .then(res => res.json())
      .then(data => {
        // console.log("📦 API RESPONSE:", data);

        // 🔥 UNIVERSAL FIX (sab cases handle)
        let finalData = [];

        if (Array.isArray(data)) {
          finalData = data;
        } else if (data.data) {
          finalData = data.data;
        } else if (data.chapters) {
          finalData = data.chapters;
        } else if (data.result) {
          finalData = data.result;
        }
        setChapters(finalData);
      })
      .catch(err => console.log("❌ ERROR:", err));

  }, [sahitaId]);

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.back}>⬅</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>शिव पुराण</Text>
      </View>

      {/* 🔥 LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {chapters.length === 0 ? (
            <Text style={styles.emptyText}>Loading.....</Text>
          ) : (
            chapters.map(item => (
              <TouchableOpacity
                key={item._id}
                style={styles.card}
                onPress={() => navigation.navigate('ChapterDetail',{chapterId:item._id})}
              >
                <Text style={styles.cardText}>
                  अध्याय {item.chapterNumber || item.title}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default ChapterListScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0a0a23',
  },
  emptyText: {
    color:'#fff',
    marginTop:10,
    textAlign:'center'
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
    alignItems:'center',
    gap:40,
    marginBottom:20
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
    fontSize:20,
    fontWeight: '500',
    color: '#ccc',
  },
});