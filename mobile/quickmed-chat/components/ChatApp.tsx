import { useState, useRef } from 'react';
import {
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
}

export default function ChatApp() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([
    {id: '1', text: 'Hi, how can I help you today?', sender: 'ai'},
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a mock AI response.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { paddingBottom: insets.bottom }]}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList 
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatBubble message={item.text} isUser={item.sender === 'user'} />
                )}
                contentContainerStyle={{ padding: 10 }}
                onContentSizeChange={() => 
                    flatListRef.current?.scrollToEnd({ animated: true })
                }
            />
        </TouchableWithoutFeedback>
        <InputBar message={input} setMessage={setInput} onSend={sendMessage}/>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
