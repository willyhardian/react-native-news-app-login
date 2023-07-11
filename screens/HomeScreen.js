import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'dfc9f1acf5c243349525c238c4ad0291'
let asyncStorageEmail = ''
export default function HomeScreen({ navigation }) {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext)
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?language=en&q=tesla&from=2023-07-05&sortBy=publishedAt&apiKey=${API_KEY}`)
                if (!response.ok) {
                    throw new Error('error')
                }
                const responseJSON = await response.json()
                setNews(responseJSON.articles.slice(0, 3))
                asyncStorageEmail = await AsyncStorage.getItem('email')
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])
    function toggleThemeBgColor() {
        return { backgroundColor: (isDarkTheme ? "black" : "#ffffff") }
    }
    function toggleThemeTextColor() {
        return { color: (isDarkTheme ? "white" : "#000000") }
    }
    return (
        <ScrollView style={toggleThemeBgColor()}>
            <Text>Async Storage Email: {asyncStorageEmail}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                async function removeEmail() {
                    try {
                        await AsyncStorage.removeItem('email')
                        navigation.navigate('Login')
                    } catch (err) {
                        console.log(err)
                    }
                }
                removeEmail()
            }}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                {
                    loading ? <ActivityIndicator size={'large'} /> :
                        news && news?.map((perNews, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => navigation.navigate('Detail', { perNews })}>
                                    <View style={styles.newsContainer}>
                                        <View style={styles.newsLeftBox}>
                                            <Image
                                                style={styles.newsImage}
                                                source={{
                                                    uri: perNews.urlToImage
                                                }}
                                            />
                                        </View>
                                        <View style={styles.newsRightBox}>
                                            <Text style={[styles.newsTitle, toggleThemeTextColor()]}>{perNews.title}</Text>
                                            <Text style={[styles.newsAuthor, toggleThemeTextColor()]}>{perNews.author || "Unkown"}</Text>
                                            {/* <Text>{perNews.description.replace("<p>", "").replace("</p>", "")}</Text> */}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                }
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsContainer: {
        flexDirection: 'row',
        padding: 10
    },
    newsImage: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    newsLeftBox: {

    },
    newsRightBox: {
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'center'
    },
    newsDescription: {
        flexWrap: 'wrap',
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: '400',
    },
    newsAuthor: {
        color: '#696969'
    }
});