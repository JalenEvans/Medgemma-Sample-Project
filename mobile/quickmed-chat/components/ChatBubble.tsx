import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type Props = {
    message: string;
    isUser: boolean;
    timestamp?: number;
};

export default function ChatBubble({ message, isUser, timestamp }: Props) {
    const slideAnim = useRef(new Animated.Value(20)).current; // start 20 px below
    const opacityAnim = useRef(new Animated.Value(0)).current; // start invisible

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    }, [slideAnim, opacityAnim]);

    return (
        <Animated.View 
            style={[
                styles.bubble, 
                isUser ? styles.userBubble : styles.aiBubble,
                {transform: [{ translateY: slideAnim }], opacity: opacityAnim }
            ]}>
            <Text style={[styles.text, isUser && styles.userText]}>{message}</Text>
            
            {timestamp && 
            <Text style={styles.timestampText}>
                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>}
        </ Animated.View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        margin: 6,
        maxWidth: '75%',
        borderRadius: 15,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#04376dff',
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    text: {
        color: '#000',
    },
    userText: {
        color: '#fff',
    },
    timestampText: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
        alignSelf: 'flex-end',
    }
})