import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import StotramListScreen from './screens/shiv-stotram/ShivStotramScreen';
import StotramDetailScreen from './screens/shiv-stotram/StotramDetailScreen';
import ShivAartiScreen from './screens/shiv-aarti/ShivAartiScreen';
import ShivChalisaScreen from './screens/shiv-chalisa/ShivChalisaScreen';
import JyotirlingListScreen from './screens/shiv-jyotirling/JyotirlingListScreen';
import JyotirlingDetailScreen from './screens/shiv-jyotirling/JyotirlingDetailScreen';
import AvatarListScreen from './screens/shiv-avatar/AvatarListScreen';
import AvatarDetailScreen from './screens/shiv-avatar/AvatarDetailScreen';
import SahitaScreen from './screens/shiv-puran/ShivPuranScreen';
import ChapterListScreen from './screens/shiv-puran/ShivPuranChapterScreen';
import ChapterDetailScreen from './screens/shiv-puran/ShivPuranChapterDetailsScreen';
import KathaListScreen from './screens/shiv-katha/KathaListScreen';
import KathaDetailScreen from './screens/shiv-katha/KathaDetailScreen';
import MantraListScreen from './screens/shiv-mantra/MantraListScreen';
import MandirDetailScreen from './screens/shiv-mandir/MandirDetailScreen';
import MandirListScreen from './screens/shiv-mandir/MandirListScreen';
import MantraDetailScreen from './screens/shiv-mantra/MantraDetailScreen';
import AboutScreen from './screens/Home/AboutScreen';
import SettingsScreen from './screens/Home/SettingScreen';
import { useEffect, useState } from 'react';

import *  as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator();

export default function App() {
    const MyTheme = {...DefaultTheme,
      colors:{...DefaultTheme.colors,
        background:'#000000',}}

    const [ready,setReady] = useState(false)
  useEffect(()=>{
    const prepare = async () => {
      try {
        await new Promise(r=>setTimeout(r,500))
      }finally{
        setReady(true)
        await SplashScreen.hideAsync()
      }
    }
      prepare()
  },[])
  if(!ready) {
    <View style={{flex:1,backgroundColor:'#000'}}/>
  }
  return (
    <View style={{flex:1,backgroundColor:'#000000'}}>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown:false, contentStyle:{backgroundColor:'#000000'}}} >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name='sahita' component={SahitaScreen} />
        <Stack.Screen name='ChapterScreen' component={ChapterListScreen} />
        <Stack.Screen name='ChapterDetail' component={ChapterDetailScreen} />
        <Stack.Screen name='jyotirling' component={JyotirlingListScreen} />
        <Stack.Screen name='JyotirlingDetail' component={JyotirlingDetailScreen} />
        <Stack.Screen name="stotram" component={StotramListScreen} />
        <Stack.Screen name='StotramDetail' component={StotramDetailScreen} />
        <Stack.Screen name='katha' component={KathaListScreen} />
        <Stack.Screen name='KathaDetail' component={KathaDetailScreen} />
        <Stack.Screen name='mandir' component={MandirListScreen} />
        <Stack.Screen name='MandirDetail' component={MandirDetailScreen} />
        <Stack.Screen name='mantra' component={MantraListScreen} />
        <Stack.Screen name='MantraDetail' component={MantraDetailScreen} />
        <Stack.Screen name='avatar' component={AvatarListScreen} />
        <Stack.Screen name='AvatarDetail' component={AvatarDetailScreen} />
        <Stack.Screen name="chalisa" component={ShivChalisaScreen} />
        <Stack.Screen name="aarti" component={ShivAartiScreen} />
        <Stack.Screen name='about' component={AboutScreen} />
        <Stack.Screen name='setting' component={SettingsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
      </View>
  );
}