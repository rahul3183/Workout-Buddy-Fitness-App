import  React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,Image, TouchableOpacity,StatusBar,FlatList, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function DataGenerateScreen({navigation}){

    let [fontsLoaded] = useFonts({
        'openSansBold': require('../assets/fonts/OpenSans-Bold.ttf'),
        'openSansRegular': require('../assets/fonts/OpenSans-Medium.ttf'),
    });

    const [isBtnShow,setBtn] = useState(false);

    const showBtn = () => {

    }

    return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" />
    <View style={styles.screenWrapper}>
        <Text style={styles.headerText}>GENERATING</Text>
        <Text style={styles.headerText}>PLAN FOR YOU</Text>
        <View style={styles.progress}>
        <CircularProgress
            radius={120}
            value={100}
            duration={3000}
            inActiveStrokeColor={'#bf243e'}
            activeStrokeWidth={20}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'#000'}
            valueSuffix={'%'}
            progressValueStyle={{fontFamily:'openSansBold'}}
            onAnimationComplete={() => { setBtn(true) }}
            />
        </View>
        
        </View>
        {
            isBtnShow &&
            <View  style={styles.saveBtn}>
                <TouchableOpacity onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'mainContainer' }]
            })}>
                    <Text style={styles.BtnText}>LET'S START</Text>
                </TouchableOpacity>
            </View>
        }
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    screenWrapper:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:48,
    },
    headerText:{
        fontFamily:'openSansBold',
        fontSize:28,
    },
    progress:{
        marginTop:50,
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
    BtnText:{
        fontSize:28,
        fontWeight:'bold',
        color:"#FFF",
        alignSelf:'center',
    },
});