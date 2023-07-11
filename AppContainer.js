import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DetailScreen from './screens/DetailScreen';
import { TouchableOpacity } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import 'react-native-gesture-handler';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function AppContainer() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext)
    function toggleThemeHeaderBgColor() {
        return { backgroundColor: (isDarkTheme ? "#202020" : "#ffffff") }
    }
    function toggleThemeHeaderTextColor() {
        return (isDarkTheme ? "#ffffff" : "#000000")
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerStyle: toggleThemeHeaderBgColor(),
                    headerTintColor: toggleThemeHeaderTextColor(),
                    // headerLeft: () => null,
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleTheme}>
                            {isDarkTheme ?
                                <Ionicons name="sunny" size={32} color="#ffffff" /> :
                                <Ionicons name="moon" size={32} color="black" />}
                        </TouchableOpacity>
                    ),
                }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{
                    headerStyle: toggleThemeHeaderBgColor(),
                    headerTintColor: toggleThemeHeaderTextColor(),
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleTheme}>
                            {isDarkTheme ?
                                <Ionicons name="sunny" size={32} color="#ffffff" /> :
                                <Ionicons name="moon" size={32} color="black" />}
                        </TouchableOpacity>
                    ),
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
