import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import shivlingImg from '../../assets/shivling.jpg'

export default function AboutScreen({navigation}) {
  return (
    <View style={styles.container}>

      {/* 🔙 Back */}
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.back}>⬅</Text>
      </TouchableOpacity>

      

      {/* 📄 Content */}
      <Text style={styles.title}>Shiv Bhakti</Text>

      <Image source={shivlingImg} style={styles.img} />

      <Text style={styles.text}>Developed by: Divya Sharma</Text>
      <Text style={styles.text}>Version: 1.0</Text>

      <Text style={styles.desc}>
        This app is dedicated to Lord Shiva. You can explore Shiv Puran,
        Stotram, Aarti, Jyotirling and more spiritual content.
      </Text>

      <Text style={styles.footer}>Har Har Mahadev 🙏</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050520',
    paddingHorizontal:15,
    paddingTop:40,
  },
  back: {
    color: '#fff',
    fontSize:28,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  img:{
    width:250,
    height:250,
    borderRadius:100,
    marginBottom:40,
    alignSelf:'center'
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  desc: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    color: '#fff',
    marginTop: 40,
    fontSize: 16,
  },
});