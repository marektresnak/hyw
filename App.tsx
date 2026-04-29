import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Newsreader_600SemiBold,
  Newsreader_700Bold,
} from '@expo-google-fonts/newsreader';
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
} from '@expo-google-fonts/be-vietnam-pro';
import { colors, Hero } from './theme';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HeroSetupScreen } from './screens/HeroSetupScreen';

type Screen = 'welcome' | 'heroSetup';

export default function App() {
  const [fontsLoaded] = useFonts({
    Newsreader_600SemiBold,
    Newsreader_700Bold,
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
  });

  const [screen, setScreen] = useState<Screen>('welcome');
  const [hero, setHero] = useState<Hero>({ name: '', photoUri: null });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      {screen === 'welcome' ? (
        <WelcomeScreen
          hero={hero}
          onIntroduceHero={() => setScreen('heroSetup')}
        />
      ) : (
        <HeroSetupScreen
          hero={hero}
          onSave={(next) => {
            setHero(next);
            setScreen('welcome');
          }}
          onCancel={() => setScreen('welcome')}
        />
      )}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
