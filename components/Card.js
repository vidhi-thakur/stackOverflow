import { View, Text, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';

const Card = ({ link, question, upVote, author }) => {

    function handleOnpress() {
        Linking.openURL(link).catch((err) => console.error('An error occurred while fetching page!', err));
        console.log("press...")
    }
    return (
        <View style={styles.card}>
            <View style={styles.questionContainer}>
                <Text onPress={handleOnpress} style={styles.question}>{question}</Text>
            </View>
            <View style={styles.cardInfo}>
                <View style={styles.upvote} ><Icon name='arrow-up-outline' type='ionicon' color='#FBBF24' /><Text> {upVote}</Text></View>
                <Text>{author}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        padding: 5,
        width: '100%',
        maxWidth: 600,
        marginRight: 'auto',
        marginLeft: 'auto',
        alignItems: 'center',
        marginTop: 20,
        borderColor: '#c8c8c8',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    question: {
        fontWeight: 'bold',
        fontSize: 17,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    questionContainer: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
    },
    upvote: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

export default Card;
