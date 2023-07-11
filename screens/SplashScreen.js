import React, { useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000)
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, marginBottom: 20, fontWeight: 'bold' }}>NEWS.ID</Text>
            <ActivityIndicator size={'large'}></ActivityIndicator>
        </SafeAreaView>
    )
}
