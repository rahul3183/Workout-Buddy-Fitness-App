import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar, FlatList, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import {LinearGradient} from 'expo-linear-gradient';

const baseUrl = 'https://api.edamam.com/api/food-database/v2/parser?app_id=0fb61f05&app_key=7e1858e408aa76609ccc04e01f9575e6&ingr=';



export default function FoodScreen({navigation}) {

    const [getData,setData] = useState('');
    const [isLoading,setLoading] = useState(false);
    const [isSearched,setSearched] = useState(false);

    const [search,setSearch] = useState('');

    const LoadData = async () => {
        setData('');
        setLoading(true);
        setSearched(true);
        const url = baseUrl + search;
        axios.get(url)
        .then(response => {
            setData(response.data.hints);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }

   

    const renderItem = ({item}) => {
        return (
            <View style={styles.cardView}>
            <LinearGradient
            colors={['#6b9bfd', '#7ea6f7']}
            style={styles.FoodCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >

            <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text  numberOfLines={1} style={{width:200, fontSize:24,fontWeight:'bold',color:'#eff7f7'}}>{item.food.label}</Text>
              <View style={{backgroundColor:'#f6bb0a',alignItems:'center',justifyContent:'center',borderRadius:18,paddingHorizontal:12}}>
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{
                    Math.floor(Number(item.food.nutrients.ENERC_KCAL))
                } Kcal</Text>
              </View>
            </View>
              <Text style={{fontSize:12,color:'#c8d8fa'}}>{item.food.brand}</Text>
            </View>

              <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:14}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#eff7f7'}}>{
                    Math.floor(Number(item.food.nutrients.PROCNT))} </Text>
                    <Text style={{fontSize:12,fontWeight:'bold',color:'#eff7f7'}}>Protein</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#eff7f7'}}>{
                    Math.floor(Number(item.food.nutrients.CHOCDF))} </Text>
                    <Text style={{fontSize:12,fontWeight:'bold',color:'#eff7f7'}}>Carbs</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#eff7f7'}}>{
                    Math.floor(Number(item.food.nutrients.FAT))} </Text>
                    <Text style={{fontSize:12,fontWeight:'bold',color:'#eff7f7'}}>Fat</Text>
                </View>
              </View>
            </LinearGradient>
        </View>
        )
    }
    
    
    console.log(search);
    return (
        <SafeAreaView  style={{flex:1}}>
        <LinearGradient
            colors={['#6b9bfd', '#6153ee']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >
         <Text style={[styles.headerText,{paddingHorizontal:20}]}>Food Nutrition</Text>
         <View style={styles.SearchView}>
            <View style={{flexDirection:'row',justifyContent:'space-around',paddingHorizontal:6}}>
                <View style={styles.inputContainer}>
                <Ionicons name={'search-outline'} size={22} color={'#eff7f7'} style={{marginRight:6}}/>
                <TextInput onChangeText={(text) => setSearch(text)} style={{color:'#eff7f7',flex:1 }} placeholderTextColor="#eff7f7" placeholder={'Search for a food'}/>
                </View>
            <TouchableOpacity onPress={() => LoadData()}>
                <View style={styles.btn}><Ionicons name={'search-outline'} size={22} color={'#eff7f7'}/></View>
            </TouchableOpacity>
            </View>
            </View>
            <View style={styles.DataView}>
                {
                    isLoading && 
                    <View style={styles.spinner}>
                     <ActivityIndicator size="large" color='#198cc2' />
                    </View>
                }
                {
                    (getData.length)?
                     <FlatList 
                     data={getData}
                     renderItem={renderItem} 
                     keyExtractor={item => item.food.foodId}
                     showsVerticalScrollIndicator={false}
                     />
                     :
                     !isLoading && isSearched && <Text style={{alignSelf:'center',fontSize:20,marginTop:32}}>Result Not found</Text>
                }
            </View>
           
            </LinearGradient>
            </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#035b96',
        paddingTop:12,
    },
    headerText:{
        fontSize:26,
        fontWeight:'bold',
        color:'white'
    },
    btn:{
        height:50,
        width:56,
        backgroundColor:'#04396c',
        alignSelf:'center',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
    },
    DataView:{
        flex:2,
        backgroundColor:'#eff7f7',
        width:'100%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,

        overflow:'hidden',
    },
    SearchView:{
        flex:0.5,
        alignSelf:'center',
        alignItems:'center',
        marginTop:10,
    },
    cardView:{
       alignItems:'center',
       justifyContent:'center',
    },
    userInput:{
        width:250,
        height:50,
        borderRadius:22,
        borderColor:'black',
        backgroundColor:'grey',
        alignSelf:'center',
    },
    label:{
        marginVertical:5,
        fontSize:14,
        color:'grey',
    },
    inputContainer:{
        height:50,
        backgroundColor:'#90a2ff',
        flexDirection:'row',
        paddingHorizontal:15,
        alignItems:'center',
        borderRadius:12,
        width:'80%',
    },
    spinner:{
        paddingVertical:28,
        alignSelf:'center',
        justifyContent:'center',
    },
    FoodCard:{
        width:'92%',
        height:140,
        backgroundColor:'#73b9de',
        borderRadius:12,
        marginTop:22,
        paddingHorizontal:22,
        paddingVertical:12,

        borderColor:'#7978B5',
    },
    infoText:{
        fontWeight:'bold',
        marginRight:12,
    }
})