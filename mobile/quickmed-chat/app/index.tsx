import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatApp from '@/components/ChatApp';

export default function Index() {
  return (
    <SafeAreaProvider>
      <ChatApp />
    </SafeAreaProvider>
  )
}
