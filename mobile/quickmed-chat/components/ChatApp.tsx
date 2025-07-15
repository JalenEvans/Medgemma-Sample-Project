import { useState, useRef } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBubble from '@/components/ChatBubble';
import InputBar from '@/components/InputBar';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: number;
}

export default function ChatApp() {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hi, how can I help you today?', sender: 'ai', timestamp: Date.now() },
    ]);
    const [input, setInput] = useState('');
    const [isAITyping, setIsAITyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        setIsAITyping(true);

        // Add the "typing" message initially
        setMessages((prev) => [
            ...prev,
            { id: 'typing', text: '.', sender: 'ai' }
        ]);

        const dots = ['.', '..', '...'];
        let index = 0;

        // Update the typing message every 500ms
        const dotInterval = setInterval(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === 'typing' ? { ...msg, text: dots[index % dots.length] } : msg
                )
            );
            index++;
        }, 300);

        // After 3 seconds, replace typing with AI final message
        setTimeout(() => {
            clearInterval(dotInterval);
            setMessages((prev) =>
                prev
                    .filter((msg) => msg.id !== 'typing')
                    .concat({
                        id: (Date.now() + 1).toString(),
                        text: 'This is a mock AI response that streams slowly',
                        sender: 'ai',
                        timestamp: Date.now()
                    })
            );
            setIsAITyping(false);
        }, 3000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { paddingBottom: insets.bottom }]}
        >
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <ChatBubble message={item.text} isUser={item.sender === 'user'} timestamp={item.timestamp} />
                    )}
                    contentContainerStyle={{ padding: 10, flexGrow: 1 }}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                    onScrollBeginDrag={Keyboard.dismiss}
                />
            </View>
            <InputBar message={input} setMessage={setInput} onSend={sendMessage} disabled={isAITyping} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
