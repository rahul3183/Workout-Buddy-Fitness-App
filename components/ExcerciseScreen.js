import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar,FlatList, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking} from 'react-native'
import { ImageBackground } from 'react-native';
import WorkoutData from '../assets/data/WorkoutData';


const workoutData = [
    [
        {
            id:'1',
            headerText:'FULL BODY WORKOUT',
            headerImage:require('../assets/images/banners/FullBodyWorkoutBanner.jpg'),
        },
        {
            id:'2',
            headerText:'CHEST BODY WORKOUT',
            headerImage:require('../assets/images/banners/chestWorkoutBanner.png'),
        },
        {
            id:'3',
            headerText: 'ARM WORKOUT',
            headerImage: require('../assets/images/banners/TricepWorkoutBanner.jpg'),
          },
          {
            id:'4',
            headerText: 'SHOULDER & LATS WORKOUT',
            headerImage: require('../assets/images/banners/LatsWorkoutBanner.jpg'),
          },
          {
            id:'5',
            headerText: 'LEGS WORKOUT',
            headerImage: require('../assets/images/banners/LegsWorkoutBanner.jpg'),
          },
          {
            id:'6',
            headerText: 'ABS WORKOUT',
            headerImage: require('../assets/images/banners/AbsWorkoutBanner.png'),
          },
    ]
];

export default function ExcerciseScreen({navigation,route}) {

    const workoutID = route.params;
    
    const [getData,setData] = useState(WorkoutData[workoutID-1]);
    const [getData2,setData2] = useState(workoutData[0][workoutID-1]);

    const renderItem = ({item}) => {
        return (
            <View style={styles.goalCard}>
            
            <View style={[styles.ModesCard]}>
            <TouchableWithoutFeedback onPress={() => {Linking.openURL(item.url)}}> 
            <View style={styles.WorkoutPreview}>
            <Image style={styles.thumbnail} source={{uri:item.thumbnail}}/>
            <View style={styles.overlayView}/>
            <Icon style={styles.icon} name="videocam" size={30} />
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.workoutInfo}>
              <Text style={styles.infoText}>{item.title}</Text>
              <Text style={styles.infoTextLight}>{(item.time == '0')?item.reps +'x':item.time + 's'}</Text>
            </View>
              <Image source={item.image} style={[styles.cardIcon,{bottom:item.id=='1'?40:26}]}></Image>
            </View>
           
        </View>
        )
    }

    const FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#dedede",
              alignSelf:'center',
            }}
          />
        );
      }

      const ListHeader = () => {
        return (
          <View style={styles.headerStyle}>
            <ImageBackground style={styles.headerImage} source={getData2.headerImage} >
            <View style={styles.overlayView2}/>
            <Icon style={styles.backIcon} name="arrow-back-outline" size={30} color='white' onPress={() => navigation.goBack()}/>
            <Text style={styles.headerText2}>
                {getData2.headerText}
            </Text>
            </ImageBackground>
            
          </View>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.screenWrapper}>
            <FlatList 
              data={getData}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              ItemSeparatorComponent = { FlatListItemSeparator }
              ListHeaderComponent={ListHeader}
              showsVerticalScrollIndicator={false}
              
            />
            
            <TouchableWithoutFeedback onPress={() => {navigation.navigate("Workout",getData)}}> 
            <View style={styles.StartBtn}>
            <Text style={styles.BtnText}>START</Text>
            </View>
            </TouchableWithoutFeedback>
  
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    screenWrapper:{
        marginBottom:50,
        alignItems:'center',
        justifyContent:'center',
    },
    headerText:{
        fontSize:28,
        fontWeight:'bold',
    },
    headerStyle:{
    },
    headerText2:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
        alignSelf:'flex-end',
        paddingVertical:10,
    },
    backIcon:{
        marginLeft:12,
        marginTop:8,
    },
    BtnText:{
        fontSize:22,
        fontWeight:'bold',
        color:"#FFF",
        alignSelf:'center',
    },
    cardText:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        paddingHorizontal:22,
    },
    ModesCard:{
        flexDirection:'row',
        paddingHorizontal:40,
        paddingVertical:20,
    },
    WorkoutPreview:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:120,
    },
    thumbnail:{
        height:85,
        width:120,
    },
    icon:{
        position:'absolute',
        color:'#595959',
    },
    overlayView: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius:10,
    },
    overlayView2: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius:10,
    },
    workoutInfo:{
        justifyContent:'center',
    },
    infoText:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        paddingHorizontal:22,
        alignSelf:'flex-start',
    },
    infoTextLight:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        paddingHorizontal:22,
        alignSelf:'flex-start',
        color:'grey',
    },
    StartBtn:{
        height:55,
        width:'80%',
        backgroundColor:'#6b9bfd',
        alignSelf:'center',
        borderRadius:40,
        marginTop:16,
        justifyContent:'center',
    },
    headerImage:{
        width:'100%',
        height:150,
        flexDirection:'row',
    }
})