import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar,FlatList, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';


const dataSource = [
    {
      id:'1',
      title: 'LOSE WEIGHT',
      image: require('../assets/images/loseWeightIcon.png'),
    },
    {
      id:'2',
      title: 'BUILD MUSCLES',
      image: require('../assets/images/buildMuscles.png'),
    },
  ];



  
export default function Home({navigation}) {

    const [getData, setData] = useState(dataSource);
    const [selectedId, setSelectedId] = useState(null);

   
    const saveData = async (val) => {
      setSelectedId(val);
      try {
        if(selectedId){
          console.log("id" + selectedId);
          await AsyncStorage.setItem('workoutgoal',selectedId);
        }
      }
      catch(e) {
        console.log("error saving data");
      }
  }
   

    const renderItem = ({item}) => {
    return (      
      <View style={styles.goalCard}>
         <TouchableWithoutFeedback onPress={() => {saveData(item.id)}}> 
            <View style={[styles.ModesCard,
            {borderWidth:selectedId === item.id?3:0},{borderColor:"#bf243e"}]}>
              <Text style={styles.cardText}>{item.title}</Text>
              <Image source={item.image} style={[styles.cardIcon,{bottom:item.id=='1'?40:26}]}></Image>
             
            </View>
            </TouchableWithoutFeedback>
        </View>
    );
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.screenWrapper}>
        <Text style={styles.headerText}>WHAT IS YOUR MAIN</Text>
        <Text style={styles.headerText}>GOAL?</Text>
          <FlatList 
            data={getData}
            renderItem={renderItem} 
            keyExtractor={item => item.id}
            extraData={selectedId}
          />

      </View>
      {
        <View style={[styles.saveBtn,{backgroundColor:selectedId?'#bf243e':'#ababab'}]}>
              <TouchableOpacity disabled={!selectedId} onPress={() => navigation.navigate('OnBoard')} >
                  <Text style={styles.BtnText}>NEXT</Text>
              </TouchableOpacity>
          </View>
      } 
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"#FFF",
  },
  headerText:{
      fontSize:28,
      fontWeight:'bold',
  },
  BtnText:{
      fontSize:28,
      fontWeight:'bold',
      color:"#FFF",
      alignSelf:'center',
  },
  cardText:{
      fontSize:24,
      fontWeight:'bold',
      color:"#999999",
      paddingHorizontal:20,
      paddingVertical:20,
      alignSelf:'center',
  },
  cardIcon:{
      height:150,
      width:150,
      resizeMode:'contain',
  },
  cardIcon2:{
      height:'100%',
      width:'50%',
      left:5,
  },
  screenWrapper:{
      flexDirection:'column',
      alignItems:'center',
      marginTop:48,
  },
  goalCard:{
      marginTop:5,
      paddingVertical:10,
      paddingHorizontal:15,
  },
  ModesCard:{
    backgroundColor:"#ededed",
      height:100,
      width:350,
      borderRadius:20,
      overflow:'hidden',
      shadowColor:'#000',
      shadowOffset:{
      width:0,
      height:2,
      },
      shadowOpacity:0.2,
      shadowRadius:8,
      elevation:4,
      marginTop:30,
      flexDirection:'row',
      borderColor:'f9c2ff',
  },
  saveBtn:{
      width:350,
      height:60,
      backgroundColor:'#bf243e',
      borderRadius:60,
      justifyContent: 'center', // inner items will be added vertically
      position:'absolute',        // all the available vertical space will be occupied by it
      bottom:25,
      alignSelf:'center',
  },
})