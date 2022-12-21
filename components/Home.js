import { StatusBar } from 'expo-status-bar';
import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,TouchableWithoutFeedback, FlatList, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

  
export default function Home({navigation}) {

  const workouts = [
    {
      id:'1',
      title: 'FULL BODY CHALLENGE',
      image: require('../assets/images/banners/FullBodyWorkoutBanner.jpg'),
      category:'0',
    },
    {
      id:'2',
      title: 'CHEST WORKOUT',
      image: require('../assets/images/banners/chestWorkoutBanner.png'),
      category:'2',
    },
    {
      id:'3',
      title: 'ARM WORKOUT',
      image: require('../assets/images/banners/TricepWorkoutBanner.jpg'),
      category:'2',
    },
    {
      id:'4',
      title: 'SHOULDER & LATS WORKOUT',
      image: require('../assets/images/banners/LatsWorkoutBanner.jpg'),
      category:'2',
    },
    {
      id:'5',
      title: 'LEGS WORKOUT',
      image: require('../assets/images/banners/LegsWorkoutBanner.jpg'),
      category:'2',
    },
    {
      id:'6',
      title: 'ABS WORKOUT',
      image: require('../assets/images/banners/AbsWorkoutBanner.png'),
      category:'2',
    },
  ];

  const [WorkoutMinutes,setWorkoutMinutes] = useState(0);
  const [weight,setWeight] = useState('');

  const [caloriesBurned,setCaloriesBurned] = useState(0);
  const [totalWorkouts,setTotalWorkouts] = useState(0);

  const getData = async() => {
    try {
      const minutes = await AsyncStorage.getItem('workoutTimer');
      const w = await AsyncStorage.getItem('userweight');
      const tw = await AsyncStorage.getItem('totalWorkout');

      console.log("data fetched");
      if(minutes) {
        setWorkoutMinutes(minutes);
      }
      if(w) {
        setWeight(w);
      }
      if(tw) {
        setTotalWorkouts(tw);
      }
      
      const burned = WorkoutMinutes * 2 * weight / 200;
      setCaloriesBurned(burned);

    } catch(e) {
        console.log("error loading data");
    }
}

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getData();
  });
  return unsubscribe;
},[navigation])

console.log(caloriesBurned);

  const renderItem = ({item}) => {
    return (      
      <View style={styles.BannerCard}>
         <TouchableWithoutFeedback onPress={() => {navigation.navigate('ExcerciseScreen',item.id)}}> 
            <View style={[styles.workoutBanner]}>
              
              <ImageBackground source={item.image} style={[styles.bannerIcon]}>
              <View style={styles.overlayView}/>
              <Text style={styles.bannerText}>{item.title}</Text>
              </ImageBackground>
             
            </View>
            </TouchableWithoutFeedback>
        </View>
    );
    };

  return (
    <SafeAreaView style={styles.container}>
     
      <StatusBar translucent backgroundColor="#6b9bfd" />
      <ScrollView>
      <LinearGradient
        colors={['#6b9bfd', '#6153ee']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
      >

        <View style={styles.TopWrapper}>
        <View style={styles.topCard}>
          <Text style={styles.topText}>{totalWorkouts}</Text>
          <Text style={styles.topText}>WORKOUTS</Text>
        </View>
        <View style={styles.topCard}>
          <Text style={styles.topText}>{caloriesBurned}</Text>
          <Text style={styles.topText}>KCALS</Text>
        </View>
        <View style={styles.topCard}>
          <Text style={styles.topText}>{
             (WorkoutMinutes < 60 && WorkoutMinutes > 0)?WorkoutMinutes:Math.floor(WorkoutMinutes/60)
          }</Text>
          <Text style={styles.topText}>{
            (WorkoutMinutes < 60 && WorkoutMinutes > 0)?'SECONDS':'MINUTES'
          }</Text>
        </View>
        </View>
        <View style={styles.screenWrapper}>
        
          <View style={styles.BodyCard}>
           
           <View style={styles.cards}>
           <FlatList 
            data={workouts}
            renderItem={renderItem} 
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            //extraData={selectedId}
          />
           </View>
          </View>
          <View style={styles.headerCard}>
          <Text style={styles.headerText}>DAILY PROGRESS</Text> 
          <View style={{justifyContent:'space-evenly',flexDirection:'row',paddingHorizontal:18,paddingVertical:8}}>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>M</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>T</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>W</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,fontWeight:'bold'}}>T</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              {/*<Ionicons name="checkmark-outline" size={20} color={'#fff'}></Ionicons>*/}
              <Text style={{fontSize:14,fontWeight:'bold'}}>F</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>S</Text>
            </View>
            <View style={{width:34,height:34, backgroundColor:'#d9d9d9',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>S</Text>
            </View>
          </View>
          </View>
          
        </View>
        </LinearGradient>
        </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"#FFF",
  },
  headerText:{
      fontSize:18,
      fontWeight:'bold',
      padding:16,
  },
  TopWrapper:{
    flexDirection:'row',
    paddingHorizontal:16,
    paddingVertical:10,
    marginTop:35,
    justifyContent:'space-evenly',
  },
  topCard:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  topText:{
    fontSize:14,
    fontWeight:'bold',
    color:'#FFF',
  },
  BtnText:{
      fontSize:28,
      fontWeight:'bold',
      color:"#FFF",
      alignSelf:'center',
  },
  screenWrapper:{
    flexDirection:'column',
    alignItems:'center',
  },
  headerCard:{
    backgroundColor:'#FFF',
    height:150,
    width:'90%',
    borderRadius:20,
    position:'absolute',
    top:50,
    shadowColor:'#000',
      shadowOffset:{
      width:0,
      height:2,
      },
      shadowOpacity:0.1,
      shadowRadius:6,
      elevation:1,
  },
  BodyCard:{
    marginTop:120,
    backgroundColor:'#f0f0f0',
    width:'100%',
  },
  cards:{
    marginTop:100,
    paddingBottom:60,
  },
  BannerCard:{
    alignItems:'center',
    flexDirection:'column',
  },
  workoutBanner:{
    flexDirection:'column',
    alignItems:'center',
    height:140,
    width:380,
    borderRadius:10,
    overflow:'hidden',
    marginTop:20,
    overlayColor:'#000',
  },
  bannerIcon:{
    height:'100%',
    width:'100%',
    
  },
  bannerText:{
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF',
    padding:24,
  },
  overlayView: {
    height: "100%",
    width: "100%",
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
}
})