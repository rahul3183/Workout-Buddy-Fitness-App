import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { Switch } from 'react-native-switch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnBoard({navigation}) {

    const [text,onChangeText] = useState("");
    const [text2,onChangeText2] = useState("");
    
    const [weightText,onWeightTextChange] = useState(false);
    const [WeightPlaceHolder,changeWeightPlaceholder] = useState("KG");
    const [HeightPlaceHolder, ChangeHeightPlaceholder] = useState("FT");
    const [heightText,onHeightTextChange] = useState(false);

    const getDataa = async () => {
        try {
          const value = await AsyncStorage.getItem('userheight')
          if(value !== null) {
            console.log("data" + value);
          }
        } catch(e) {
            console.log("error saving data");
        }
      }
      
      getDataa();

    const saveData = async () => {
        try {
          if(text){
            await AsyncStorage.setItem('userweight',text);
          }
          if(text2) {
            await AsyncStorage.setItem('userheight',text2);
          }
        }
        catch(e) {
          console.log("error saving data");
        }
        
        AsyncStorage.setItem('userLogin','1');
        navigation.reset({
            index: 0,
            routes: [{ name: 'mainContainer' }]
       })
    }

    const toggleSwitch = () => {
        if(!weightText) {
            changeWeightPlaceholder("LB");
        }
        else{
            changeWeightPlaceholder("KG");
        }
        onWeightTextChange(previousState => !previousState);
    }

    const toggleSwitchHeight = () => {
        if(!heightText) {
            ChangeHeightPlaceholder("FT");
        }
        else{
            ChangeHeightPlaceholder("CM");
        }
        onHeightTextChange(previousState => !previousState);
    }

  return (
    
    <SafeAreaView  style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.screenWrapper}>
            <Text style={styles.headerText}>LET US KNOW YOU</Text>
            <Text style={styles.headerText}>BETTER</Text>
            <View style={styles.goalCard}>
                <View style={styles.InputArea}>
                <Text style={styles.label}>Weight</Text>
                <View style={styles.inputData}>
                    <TextInput style={styles.input} onChangeText={onChangeText} value={text} keyboardType={'numeric'} placeholder={WeightPlaceHolder}></TextInput>
                    <View style={styles.metrics}>
                    <Switch
                    onValueChange={toggleSwitch}
                    value={weightText}
                    activeText={'KG'}
                    inActiveText={'LB'}
                    circleSize={27}
                    barHeight={26}
                    backgroundActive={'#3c8cc9'}
                    backgroundInactive={'#3c8cc9'}
                    circleActiveColor={'#FFF'}
                    renderActiveText={true}
                    renderInActiveText={true}
                    switchBorderRadius={4}
                />
                </View>
                </View>
                </View>
                <View style={styles.InputArea}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.inputData}>
                    <TextInput style={styles.input} onChangeText={onChangeText2} value={text2} keyboardType={'numeric'} placeholder={HeightPlaceHolder}></TextInput>
                    <Switch
                    onValueChange={toggleSwitchHeight}
                    value={heightText}
                    activeText={'CM'}
                    inActiveText={'FT'}
                    circleSize={27}
                    barHeight={26}
                    backgroundActive={'#3c8cc9'}
                    backgroundInactive={'#3c8cc9'}
                    circleActiveColor={'#FFF'}
                    renderActiveText={true}
                    renderInActiveText={true}
                    switchBorderRadius={4}
                />
                </View>
                </View>
                <View>
            </View>
            </View>
        </View>
        <View  style={styles.saveBtn}>
            <TouchableOpacity onPress={() => saveData()}>
                <Text style={styles.BtnText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    screenWrapper:{
        flexDirection:'column',
        justifyContent:'space-between',
        marginTop:48,
    },
    headerText:{
        fontSize:28,
        fontFamily:'openSansBold',
        alignSelf:'center',
    },
    label:{
        fontSize:16,
    
    },
    BtnText:{
        fontSize:28,
        fontWeight:'bold',
        color:"#FFF",
        alignSelf:'center',
    },
    inputData:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    InputArea:{
        marginBottom:32,
    },
    goalCard:{
        marginTop:48,
        paddingHorizontal:40,
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
    metrics:{
    
    },
    input:{
        width: 100,
        padding:4,
        borderBottomWidth:1,
        borderBottomColor:'#ababab',
    }
})
