import React from 'react';
import {
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBubble from '@/components/ChatBubble';
import InputBar from '@/components/InputBar';
import { useChatStream } from '@/hooks/useChatStream';

export default function ChatApp() {
    const insets = useSafeAreaInsets();
    const flatListRef = React.useRef<FlatList>(null);
    const { messages, input, setInput, isAITyping, sendMessage } = useChatStream();

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
