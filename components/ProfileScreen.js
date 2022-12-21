import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {

    const [height,setHeight] = useState('');
    const [weight,setWeight] = useState('');
    const [workoutgoal,setWorkoutGoal] = useState('');

    const getData = async() => {
        try {
          const h = await AsyncStorage.getItem('userheight');
          const w = await AsyncStorage.getItem('userweight');
          const g = await AsyncStorage.getItem('workoutgoal');

          if(h) {
            setHeight(h);
          }
          if(w) {
            setWeight(w);
          }
          if(g) {
            setWorkoutGoal(g);
          }

        } catch(e) {
            console.log("error loading data");
        }
    }

    useEffect(() => {
       getData();
    },[])

    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <LinearGradient colors={['#6b9bfd', '#6153ee']} style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 3.5 }}>
                <View>
                <Text style={{fontSize:40,fontWeight:'bold',color:'#eff7f7'}}>User</Text>
                <Text style={{fontSize:14,color:'#eff7f7', marginLeft:2}}>Streak: 1 days</Text>
                </View>
                <Ionicons name={'person-circle-outline'} size={34} color={'#eff7f7'} style={{marginRight:0}}/>
            </LinearGradient>
            <View style={styles.body}>
            <View style={{height: 1,width: "100%",backgroundColor: "#dedede",alignSelf:'center',marginVertical:12}}/>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Goals</Text>
            <View>
            <Text style={{fontSize:14, marginTop:12}}>Weight</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'bold', marginTop:2}}>{weight} kg</Text>
                <TouchableOpacity>
                    <Text style={{color:'#6153ee',fontWeight:'bold',marginRight:14}}>UPDATE</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize:12,fontWeight:'bold', marginTop:1,color:'#adadad'}}>{
            (workoutgoal == '1')?'lose 0.25 kg per week':
            'Gain 0.25 kg per week'}</Text>
            </View>
            <View style={{marginTop:6}}>
            <Text style={{fontSize:14, marginTop:12}}>Height</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'bold', marginTop:2}}>{height} ft</Text>
                <TouchableOpacity>
                    <Text style={{color:'#6153ee',fontWeight:'bold',marginRight:14}}>UPDATE</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={{marginTop:6}}>
            <Text style={{fontSize:14, marginTop:12}}>Daily Calories</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:2}}>{
                (workoutgoal == '1')?'1,800':'3,200'
            } cals</Text>
            </View>
            <View style={{height: 1,width: "100%",backgroundColor: "#dedede",alignSelf:'center',marginVertical:18}}/>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Active Challenges</Text>
            <View style={{flexDirection:'row',marginLeft:12,alignItems:'center',paddingTop:12}}>
            <Ionicons name={'trophy-outline'} size={34} color={'black'} style={{marginRight:12}}/>
            <Text style={{fontSize:14, marginTop:12}}>No active challenge currently</Text>
            </View>
            <View style={{height: 1,width: "100%",backgroundColor: "#dedede",alignSelf:'center',marginVertical:18}}/>
            <TouchableOpacity>
                <Text style={{color:'#6153ee',fontWeight:'bold'}}>ADD CHALLENGE</Text>
            </TouchableOpacity>
            <View style={{height: 1,width: "100%",backgroundColor: "#dedede",alignSelf:'center',marginVertical:18}}/>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eff7f7',
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:18,
        height:140,
        borderBottomLeftRadius:14,
        borderBottomRightRadius:14,
        alignItems:'center',
    },
    body:{
        marginTop:18,
        paddingHorizontal:12,
    }
})