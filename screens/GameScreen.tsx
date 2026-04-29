import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, HERO_IMAGE, Hero } from '../theme';
import { STOPS } from '../game/stops';
import { ClueScreen } from './ClueScreen';
import { ArrivalScreen } from './ArrivalScreen';

type Phase = 'clue' | 'arrival' | 'end';

type Props = {
  hero: Hero;
  onExit: () => void;
};

export function GameScreen({ hero, onExit }: Props) {
  const [stopIndex, setStopIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('clue');

  if (phase === 'end') {
    return <EndScreen heroName={hero.name} onExit={onExit} />;
  }

  const stop = STOPS[stopIndex];
  const isLastStop = stopIndex === STOPS.length - 1;

  if (phase === 'clue') {
    return (
      <ClueScreen
        stop={stop}
        stopIndex={stopIndex}
        totalStops={STOPS.length}
        onArrived={() => setPhase('arrival')}
        onExit={onExit}
      />
    );
  }

  return (
    <ArrivalScreen
      stop={stop}
      hero={hero}
      isLastStop={isLastStop}
      onContinue={() => {
        if (isLastStop) {
          setPhase('end');
        } else {
          setStopIndex((i) => i + 1);
          setPhase('clue');
        }
      }}
      onExit={onExit}
    />
  );
}

function EndScreen({ heroName, onExit }: { heroName: string; onExit: () => void }) {
  return (
    <View style={styles.endRoot}>
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={StyleSheet.absoluteFill}
        imageStyle={{ transform: [{ scale: 1.1 }] }}
        blurRadius={3}
      >
        <LinearGradient
          colors={['rgba(2,44,34,0.55)', colors.background, colors.background]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
      <SafeAreaView style={styles.endSafe}>
        <View style={styles.endBody}>
          <MaterialIcons name="auto-awesome" size={64} color={colors.secondary} />
          <Text style={styles.endHeadline}>
            {heroName ? `${heroName}, máš tři kousky jiskřičky!` : 'Máš tři kousky jiskřičky!'}
          </Text>
          <Text style={styles.endBodyText}>
            Tady končí dnešní ukázka. Dál čekají tulipány, slunečnice, vistérie, kouřový drak a hřiště — pokračování příště.
          </Text>
        </View>
        <View style={styles.endActions}>
          <Pressable
            onPress={onExit}
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          >
            <MaterialIcons name="home" size={20} color={colors.onSecondaryContainer} />
            <Text style={styles.primaryBtnText}>ZPĚT DOMŮ</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  endRoot: { flex: 1, backgroundColor: colors.background },
  endSafe: { flex: 1 },
  endBody: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  endHeadline: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(233,195,73,0.4)',
    textShadowRadius: 15,
  },
  endBodyText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 340,
  },
  endActions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.secondaryContainer,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 18,
  },
  primaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 2.5,
    color: colors.onSecondaryContainer,
  },
  btnPressed: { transform: [{ scale: 0.97 }], opacity: 0.85 },
});
