import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

type Props = {
    message: string;
    setMessage: (text: string) => void;
    onSend: () => void;
    disabled?: boolean;
};

export default function InputBar({ message, setMessage, onSend, disabled }: Props) {
    const handleKeyPress = ({ nativeEvent }: any) => {
        if (nativeEvent === 'Enter' && !nativeEvent.shiftKey) {
            nativeEvent.preventDefault?.();
            if (!disabled && message.trim()) onSend();
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Type your question...'
                value={message}
                onChangeText={setMessage}
                multiline
                editable={!disabled}
                onSubmitEditing={() => {
                    if (message.trim()) onSend();
                }}
                onKeyPress={handleKeyPress}
            />
            <TouchableOpacity 
                onPress={onSend} 
                style={[styles.sendButton, disabled && styles.disabled]}
                disabled={disabled || !message.trim()}
            >
                <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 40,
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f0f0f0',
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#04376dff',
        justifyContent: 'center',
    },
    sendText: {
        color: '#fff',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.5,
    },
});