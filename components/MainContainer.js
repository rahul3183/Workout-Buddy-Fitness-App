import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodScreen from './FoodScreen';
import ProfileScreen from './ProfileScreen';
import Home from './Home.js';
import Ionicons from 'react-native-vector-icons/Ionicons';


const homeScreen = 'Home';
const foodScreen = 'Food';
const profileScreen = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer({navigation}) {
    return(
        <Tab.Navigator initialRouteName={homeScreen}  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Food') {
                iconName = focused ? 'search' : 'search-outline';
              }
              else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={'#6b9bfd'} />;
            },
            headerShown:false
            })}>
        <Tab.Screen name={homeScreen} component={Home}></Tab.Screen>
        <Tab.Screen name={foodScreen} component={FoodScreen}></Tab.Screen>
        <Tab.Screen name={profileScreen} component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}
