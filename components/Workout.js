import  React,{useState,useEffect,useRef} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar,FlatList, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking} from 'react-native'
import { ImageBackground } from 'react-native';
import CircularProgress , { ProgressRef } from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Workout({navigation,route}) {

    
    
    const progressRef = useRef(ProgressRef);
    
    const data = route.params;
    const [index,setIndex] = useState(0);

    const [isTimeout,setTimeout] = useState(false);
    const [isTimeRunning,setTimerRunning] = useState(true);

    const [workoutTimer,setWorkoutTimer] = useState(0);

    const [totalWorkouts,setTotalWorkouts] = useState(0);

    const getData = async() => {
        try {
         const minutes = await AsyncStorage.getItem('workoutTimer');
         const totWorkouts = await AsyncStorage.getItem('totalWorkout');
         setWorkoutTimer(Number(minutes));
         setTotalWorkouts(Number(totWorkouts));
        } catch(e) {
            console.log("error loading data");
        }
    }
    
    useEffect(() => {
       getData();
    },[])
    
    useEffect(() => {
        const timerId = setInterval(() => {
          setWorkoutTimer(workoutTimer + 1);
        }, 1000)
        return () => clearInterval(timerId);
    }, [workoutTimer])

    
    
    const pauseTimer = () => {
        (isTimeRunning)?progressRef.current.pause():progressRef.current.play();
        setTimerRunning(!isTimeRunning);
    }

    const dataLen = Object.keys(data).length;

    const saveData = () => {
        try {
          if(workoutTimer){
            console.log("data saveed");
            AsyncStorage.setItem('workoutTimer',String(workoutTimer));
            AsyncStorage.setItem('totalWorkout',String(totalWorkouts));
          }
        }
        catch(e) {
          console.log("error saving data");
        }
    }

    console.log(workoutTimer);
         

    return (
        <SafeAreaView style={styles.container}>
        <View>
            <View style={styles.header}>
                <ImageBackground  style={styles.headerImage} source={{uri:data[index].thumbnail}}></ImageBackground>
                <View style={styles.overlayView}/>
            <View style={styles.headerIcons}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <Icon name="arrow-back-circle-sharp" size={42} color='#d4d4d4' onPress={() => navigation.goBack()}/>
                <Icon name="play-forward-circle" size={42} color='#d4d4d4' onPress={() => navigation.goBack()}/>
                </View>
            </View>
            </View>
            <View style={styles.body}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.titleText}>{data[index].title}</Text>
                <TouchableOpacity onPress={() =>{Linking.openURL(data[index].url)}}>
                <Icon style={{marginLeft:6}} name="help-circle" size={34} color='#d4d4d4'/>
                </TouchableOpacity>
            </View>
            <View style={styles.countDownWrapper}>
                {
                    (data[index].time != 0)? 
                    <CircularProgress
                    ref={progressRef}
                    radius={60}
                    value={0}
                    initialValue={data[index].time}
                    duration={data[index].time * 1000}
                    maxValue={data[index].time}
                    inActiveStrokeColor={'#bf243e'}
                    activeStrokeWidth={10}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    progressValueStyle={{fontFamily:'openSansBold'}}
                    onAnimationComplete={() => { setTimeout(true) }}
            />                  :
                    <Text style={styles.titleText}>{data[index].reps}x</Text>
                }
            
            {
                (isTimeout == false && data[index].time != '0')?
                (isTimeRunning)?
                <TouchableWithoutFeedback onPress={() => pauseTimer()}> 
                <View style={[styles.StartBtn,{backgroundColor:'#bf243e'}]}>
                <Text style={styles.BtnText}>Pause</Text>
                </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback onPress={() => pauseTimer()}> 
                <View style={[styles.StartBtn,{backgroundColor:'#2bb34a'}]}>
                <Text style={styles.BtnText}>Resume</Text>
                </View>
                </TouchableWithoutFeedback>
                :
                (index < dataLen-1)?
                <TouchableWithoutFeedback onPress={() => {setIndex(index+1),setTimeout(false),setTotalWorkouts(totalWorkouts+1),saveData()}}> 
                <View style={styles.StartBtn}>
                <Text style={styles.BtnText}>NEXT</Text>
                </View>
                </TouchableWithoutFeedback>:
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}> 
                <View style={[styles.StartBtn,{backgroundColor:'#198cc2'}]}>
                <Text style={styles.BtnText}>FINISH</Text>
                </View>
                </TouchableWithoutFeedback>
            }
            </View>
            </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    StartBtn:{
        height:55,
        width:'80%',
        backgroundColor:'#198cc2',
        alignSelf:'center',
        borderRadius:40,
        marginTop:32,
        justifyContent:'center',
    },
    titleText:{
        fontSize:24,
        fontWeight:'bold',
    },
    headerIcons:{
        width:'100%',
        paddingHorizontal:20,
        marginTop:16,
        position:'absolute',
    },
    body:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:28,
    },
    headerImage:{
        marginTop:28,
        height:200,
        width:'100%',
    },
    overlayView: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius:10,
    },
    BtnText:{
        fontSize:28,
        color:'white',
        fontWeight:'bold',
        alignSelf:'center',
    },
    Button:{
        width:'100%',
    },
    countDownWrapper:{
        paddingTop:100,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    }
})