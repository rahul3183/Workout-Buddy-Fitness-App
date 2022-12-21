import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar, ScrollViewComponent, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const SearchInput = ({label,iconName,textHolder,error,onFocus = () => {},...props}) => {
    return (
        <View style={{marginBottom:20}}>
            <View style={styles.inputContainer}>
            <Ionicons name={iconName} size={22} color={'#7978B5'} style={{marginRight:6}}/>
            <TextInput onFocus={() => {
                onFocus();
            }} style={{color:'#7978B5',flex:1}} placeholder={textHolder}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        marginVertical:5,
        fontSize:14,
        color:'grey',
    },
    inputContainer:{
        height:50,
        backgroundColor:'#F3F4FB',
        flexDirection:'row',
        paddingHorizontal:15,
        borderWidth:0.5,
        alignItems:'center',
        borderRadius:6,
        width:380,
    }
})

export default SearchInput;