import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity, Linking } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

export default function DetailScreen({ route }) {
    const { perNews } = route.params
    const { isDarkTheme } = useContext(ThemeContext)
    function toggleThemeBgColor() {
        return { backgroundColor: (isDarkTheme ? "black" : "#ffffff") }
    }
    function toggleThemeTextColor() {
        return { color: (isDarkTheme ? "white" : "#000000") }
    }
    function toggleThemeLinkColor() {
        return { color: (isDarkTheme ? "#65a0fc" : "#2176fc") }
    }
    return (
        <>
            <ScrollView style={[toggleThemeBgColor()]}>
                <Image style={styles.newsImage} source={{
                    uri: perNews.urlToImage
                }} />
                <View style={styles.container}>
                    <Text style={[styles.newsTitle, toggleThemeTextColor()]}>{perNews.title}</Text>
                    <Text style={[styles.newsAuthor, toggleThemeTextColor()]}>Author: {perNews.author || "Unknown"}</Text>
                    <Text style={[styles.newsContent, toggleThemeTextColor()]}>{perNews.content}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(perNews.url)}>
                        <Text style={[styles.newsContent, toggleThemeLinkColor()]}>Read more: {perNews.url}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    newsImage: {
        width: '100%',
        height: 300
    },
    container: {
        padding: 10
    },
    newsTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    newsAuthor: {
        fontSize: 13,
        marginBottom: 10
    },
    newsContent: {
        lineHeight: 20,
        marginBottom: 10
    }



})