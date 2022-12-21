import  React,{useState,useEffect,useLayoutEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalScreen from './components/GoalScreen';
import OnBoard from './components/OnBoard';
import DataGenerateScreen from './components/DataGenerateScreen';
import MainContainer from './components/MainContainer';
import ExcerciseScreen from './components/ExcerciseScreen';
import Workout from './components/Workout';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
export default function App() {

  const [isLogin,setLogin] = useState(false);
  const [isLoaded,setLoaded] = useState(false);

  const getData = async() => {
    try {
      const h = await AsyncStorage.getItem('userLogin');
      if(h !== null) {
        setLogin(true);
      }
      else{
        setLogin(false);
      }
     setLoaded(true);
    } catch(e) {
        console.log("error");
    }
}

useEffect(() => {
   getData();
},[])

console.log(isLogin);
  useFonts({
    'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'openSansRegular': require('./assets/fonts/OpenSans-Medium.ttf'),
  });

  if(!isLogin && isLoaded) {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GoalScreen" component={GoalScreen} options={{animation:'slide_from_right',headerShown:false}}/>    
        <Stack.Screen name="OnBoard" component={OnBoard} options={{animation:'slide_from_right',headerShown:false}}/>
        {/*
          !isLogin &&
          <Stack.Screen name="DataGenerateScreen" component={DataGenerateScreen} options={{animation:'slide_from_right',headerShown:false}}/>
      */}
      <Stack.Screen name="mainContainer" component={MainContainer} options={{headerShown:false}}/>
      <Stack.Screen name="ExcerciseScreen" component={ExcerciseScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Workout" component={Workout} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
  else if(isLoaded)
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="mainContainer" component={MainContainer} options={{headerShown:false}}/>
      <Stack.Screen name="ExcerciseScreen" component={ExcerciseScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Workout" component={Workout} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

