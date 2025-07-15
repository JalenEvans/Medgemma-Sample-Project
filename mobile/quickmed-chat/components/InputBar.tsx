import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

type Props = {
    message: string;
    setMessage: (text: string) => void;
    onSend: () => void;
};

export default function InputBar({message, setMessage, onSend}: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Type your question...'
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity onPress={onSend} style={styles.button}>
                <Text style={{ color: 'white' }}>Send</Text>
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
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 8,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
});