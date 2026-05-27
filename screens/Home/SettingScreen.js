import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>

      {/* 🔙 Back */}
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <Text style={styles.option}>🔔 Notifications (Coming Soon)</Text>
      <Text style={styles.option}>🌙 Dark Mode (Coming Soon)</Text>
      <Text style={styles.option}>🔊 Sound (Coming Soon)</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050520',
    padding: 20,
    paddingTop: 60,
  },
  back: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  option: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 15,
  },
});