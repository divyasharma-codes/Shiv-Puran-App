import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Shiv from '../assets/shiv1.jpg'
import shiv from '../assets/shiv.png'

export default function HomeScreen({navigation}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a23' }}>

      {/* 🔝 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {console.log('menu clicked');
            setMenuOpen(true)}}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}> शिव पुराण</Text>

        <View style={{ width: 30 }} />
      </View>

      {/* 📱 Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        
        <Image 
          source={shiv} 
          style={styles.image} 
        />

        <TouchableOpacity 
          style={styles.card}
          onPress={()=>navigation.navigate('sahita')}>
          <Text style={styles.cardText}>|| शिव पुराण ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
            onPress={()=>navigation.navigate('jyotirling')}>
          <Text style={styles.cardText}>|| शिव ज्योतिर्लिंग ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
          onPress={()=>navigation.navigate('stotram')}>
          <Text style={styles.cardText}>|| शिव स्तोत्र ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
          onPress={()=>navigation.navigate('mandir')}>
          <Text style={styles.cardText}>|| शिव मंदिर ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={()=>navigation.navigate('katha')}>
          <Text style={styles.cardText}>|| शिव व्रत कथा ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={()=>navigation.navigate('avatar')}>
          <Text style={styles.cardText}>|| शिव अवतार ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={()=>navigation.navigate('mantra')}>
          <Text style={styles.cardText}>|| शिव मंत्र ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={()=>navigation.navigate('chalisa')}>
          <Text style={styles.cardText}>|| शिव चालीसा ||</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={()=>navigation.navigate('aarti')}>
          <Text style={styles.cardText}>|| शिव आरती ||</Text>
        </TouchableOpacity>



      </ScrollView>

      {/* 🔻 Footer */}
      <View style={styles.footer}>
        <Text style={{ color: '#aaa' }}>हर हर हर महादेव 🙏</Text>
      </View>

      {/* 🍔 Side Menu */}
      {menuOpen && (
        <View style={styles.menuContainer}>
          
          <TouchableOpacity onPress={() => setMenuOpen(false)}>
            <Text style={styles.close}>✖</Text>
          </TouchableOpacity>

          <Image 
          source={Shiv} 
          style={styles.img} 
        />



          <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('home')
          }}>
            <Text style={styles.menuItem}>🏠 Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('sahita')
          }}>
            <Text style={styles.menuItem}>📖 शिव पुराण</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('chalisa')
          }}>
            <Text style={styles.menuItem}>🪷 शिव चालीसा</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('aarti')
          }}>
            <Text style={styles.menuItem}>🔥 शिव आरती</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('setting')
          }}>
            <Text style={styles.menuItem}>⚙️ Settings</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={()=>{
            setMenuOpen(false)
            navigation.navigate('about')
          }}>
            <Text style={styles.menuItem}>❕ About</Text>
          </TouchableOpacity>


        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height:100,
    backgroundColor: '#1c1c3c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop:25,
    justifyContent: 'space-between',
  },
  menu: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
  },
  container: {
    padding: 20,
  },
  image: {
    width:"100%",
    height:200,
    borderRadius:20,
    marginBottom:20,
    alignSelf:'center',
    resizeMode: 'contain',
    borderRadius:20,
  },
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
    color: '#fff',
    fontSize: 22,
    alignItems:'center'
  },
  footer: {
    height: 50,
    backgroundColor: '#1c1c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#01021d',
    padding: 20,
    paddingTop:50,
  },
  img :{
      width:170,
      height:170,
      borderRadius:100,
      marginBottom:30,
  },
  close: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  menuItem: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    paddingTop:10,
  },
});