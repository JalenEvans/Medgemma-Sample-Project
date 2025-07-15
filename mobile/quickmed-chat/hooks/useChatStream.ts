import { useState } from 'react';
import EventSource from 'react-native-sse';
import Constants from 'expo-constants';

const backendURL = Constants.expoConfig?.extra?.BACKEND_URL ?? '';
const port = Constants.expoConfig?.extra?.PORT ?? '';

console.log(`${backendURL}${port}/chat`);

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: number;
}

type UseChatStreamReturn = {
    messages: Message[];
    input: string;
    setInput: (val: string) => void;
    isAITyping: boolean;
    sendMessage: () => void;
}

export function useChatStream(): UseChatStreamReturn {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hi, how can I help you today?', sender: 'ai', timestamp: Date.now() },
    ]);
    const [input, setInput] = useState('');
    const [isAITyping, setIsAITyping] = useState(false);

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

        const streamingId = (Date.now() + 1).toString();
        const aiPlaceholder: Message = {
            id: streamingId,
            text: '',
            sender: 'ai',
            timestamp: Date.now(),
        };


        // Add the "typing" message initially
        setMessages((prev) => [...prev, aiPlaceholder]);
        const currInput = input;
        setInput('');
        setIsAITyping(true);

        const es = new EventSource(`${backendURL}${port}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: currInput })
        });

        es.addEventListener('message', event => {
            if (event.data === '[DONE]') {
                es.close();
                setIsAITyping(false);
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === streamingId
                            ? { ...msg, text: msg.text.trimEnd() }
                            : msg
                    )
                );
                return;
            }

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === streamingId
                        ? { ...msg, text: (msg.text ? msg.text + ' ' : '') + event.data }
                        : msg
                )
            );
        });

        es.addEventListener('error', event => {
            console.log('SSE error:', event);
            es.close();
            setIsAITyping(false);
        });
    };

    return { messages, input, setInput, isAITyping, sendMessage };
}