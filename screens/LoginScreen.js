import React, { useEffect, useState } from 'react'
import { Text, TextInput, StyleSheet, Button, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
let asyncStorageEmail = ''
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [emailValidation, setEmailValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [authFailed, setAuthFailed] = useState(false)
    useEffect(() => {
        setEmailValidation('')
        setAuthFailed(false)
    }, [email])
    useEffect(() => {
        setPasswordValidation('')
        setAuthFailed(false)
    }, [password])
    useEffect(() => {

        async function getEmail() {

            try {
                keys = await AsyncStorage.getAllKeys()
                console.log(keys, "<<")
                asyncStorageEmail = await AsyncStorage.getItem('email')
                if (asyncStorageEmail) {
                    navigation.navigate('Home')
                }
            } catch (err) {
                console.log(err)
            }
        }
        getEmail()
    }, [])
    function handleLogin() {
        const user = {
            email: 'andy@mail.com',
            password: 'abc123'
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === user.email && password === user.password) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, 2000)
        })
    }
    async function handleSubmit() {
        if (!email) {
            setEmailValidation('email is required')
            if (!password) {
                setPasswordValidation('password is required')
                return undefined
            }
            return undefined
        }
        setLoadingSubmit(true)
        try {
            const loginResponse = await handleLogin()
            if (loginResponse) {
                try {
                    await AsyncStorage.setItem('email', email);
                    navigation.replace('Home')
                } catch (e) {
                    setError('Failed to login')
                    console.log("masuk catch <<<")
                } finally {
                    setLoadingSubmit(false)
                }
            }
        } catch (err) {
            setLoadingSubmit(false)
            setAuthFailed(true)
        }

    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>{JSON.stringify({ email, password })}</Text>
                <Text>Async Storage Email: {asyncStorageEmail}</Text>
                <Text style={styles.logo}>NEWS.ID</Text>
                <Text style={styles.title}>Login to your account</Text>
                {authFailed ? <Text style={{ color: 'red' }}>Email/Password is wrong</Text> : ''}
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Input email"
                />
                <Text style={{ color: 'red' }}>{emailValidation}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Input password"
                    secureTextEntry={true}
                />
                <Text style={{ color: 'red' }}>{passwordValidation}</Text>
                {loadingSubmit ? <ActivityIndicator size={'large'} /> :
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        fontSize: 40,
        alignSelf: 'center',
        marginVertical: 20,
        fontWeight: 'bold'

    },
    title: {
        fontSize: 18,
        marginBottom: 12

    },
    input: {
        height: 40,
        marginVertical: 4,
        borderWidth: 1,
        padding: 10,
    },
    submitBtn: {
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 4
    },
    submitBtnText: {
        color: 'white'
    }
});