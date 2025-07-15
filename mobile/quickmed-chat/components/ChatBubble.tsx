import { View, Text, StyleSheet } from 'react-native';

type Props = {
    message: string;
    isUser: boolean;
    isStreaming?: boolean;
};

export default function ChatBubble({message, isUser}: Props) {
    return (
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
            <Text style={[styles.text, isUser && styles.userText]}>{message}</Text>
        </View>
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
        backgroundColor: '#007AFF',
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    text: {
        color: '#000',
    },
    userText: {
        color: '#fff'
    }
})