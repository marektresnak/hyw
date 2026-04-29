import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Gyroscope } from 'expo-sensors';
import { useAudioPlayer } from 'expo-audio';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { Stop } from '../game/stops';
import { StoryOverlay } from './StoryOverlay';
import { Hero } from '../theme';

type Props = {
  stop: Stop;
  hero: Hero;
  isLastStop: boolean;
  onContinue: () => void;
  onExit: () => void;
};

const STEADY_THRESHOLD = 0.15;
const STEADY_DURATION_MS = 1500;

export function ArrivalScreen({ stop, hero, isLastStop, onContinue, onExit }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [storyVisible, setStoryVisible] = useState(false);
  const [steadyProgress, setSteadyProgress] = useState(0);
  const [selectedLens, setSelectedLens] = useState<string | undefined>();
  const [frozenFrameUri, setFrozenFrameUri] = useState<string | undefined>();
  const cameraRef = useRef<CameraView>(null);
  const steadyStartRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);
  const characterAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const chimeTinkerbell = useAudioPlayer(require('../assets/chime-tinkerbell.mp3'));
  const chimeBellstrike = useAudioPlayer(require('../assets/chime-bellstrike.mp3'));
  // A/B per-stop alternation: even stops play tinkerbell, odd play bellstrike.
  const chime = stop.id % 2 === 0 ? chimeTinkerbell : chimeBellstrike;
  const voice = useAudioPlayer(stop.voice ?? null);

  useEffect(() => {
    if (!storyVisible || !stop.voice) return;
    voice.seekTo(0).finally(() => voice.play());
    return () => {
      voice.pause();
    };
  }, [storyVisible, stop.voice]);

  useEffect(() => {
    if (!permission?.granted) return;

    Gyroscope.setUpdateInterval(120);
    const sub = Gyroscope.addListener(({ x, y, z }) => {
      if (triggeredRef.current) return;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (magnitude < STEADY_THRESHOLD) {
        if (steadyStartRef.current == null) {
          steadyStartRef.current = now;
        }
        const elapsed = now - steadyStartRef.current;
        setSteadyProgress(Math.min(1, elapsed / STEADY_DURATION_MS));
        if (elapsed >= STEADY_DURATION_MS) {
          triggeredRef.current = true;
          showCharacter();
        }
      } else {
        steadyStartRef.current = null;
        setSteadyProgress(0);
      }
    });

    return () => sub.remove();
  }, [permission?.granted]);

  const showCharacter = () => {
    cameraRef.current
      ?.takePictureAsync({ skipProcessing: true, shutterSound: false })
      .then((photo) => {
        if (photo?.uri) setFrozenFrameUri(photo.uri);
      })
      .catch(() => {});
    Animated.sequence([
      Animated.timing(characterAnim, {
        toValue: 1.1,
        duration: 600,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
      Animated.spring(characterAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => setStoryVisible(true));
  };

  const handleManualTrigger = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    showCharacter();
  };

  const celebrate = () => {
    chime.seekTo(0).finally(() => chime.play());
    glowAnim.setValue(0);
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.3,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!permission) {
    return <View style={styles.root} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.root}>
        <SafeAreaView style={styles.permissionWrap}>
          <MaterialIcons name="photo-camera" size={48} color={colors.secondary} />
          <Text style={styles.permissionTitle}>Potřebujeme foťák</Text>
          <Text style={styles.permissionBody}>
            Postavička vyskočí přes výhled foťáku. Bez foťáku to nepůjde.
          </Text>
          <Pressable
            onPress={requestPermission}
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.primaryBtnText}>POVOLIT FOŤÁK</Text>
          </Pressable>
          <Pressable
            onPress={onExit}
            style={({ pressed }) => [styles.skipBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.skipBtnText}>Zpět</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
        <View style={styles.topNav}>
          <Pressable
            onPress={onExit}
            hitSlop={12}
            style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
          >
            <MaterialIcons name="close" size={22} color={colors.onBackground} />
          </Pressable>
          <View style={styles.brand}>
            <MaterialIcons name="explore" size={22} color={colors.amber400} />
            <Text style={styles.brandText}>{stop.title}</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        {!storyVisible && (
          <>
            <View style={styles.glassStage}>
              <View style={[styles.sparkle, styles.sparkleTL]}>
                <MaterialIcons name="auto-awesome" size={18} color={colors.amber400} />
              </View>
              <View style={[styles.sparkle, styles.sparkleTR]}>
                <MaterialIcons name="auto-awesome" size={12} color={colors.amber400} />
              </View>
              <View style={[styles.sparkle, styles.sparkleBL]}>
                <MaterialIcons name="auto-awesome" size={14} color={colors.amber400} />
              </View>
              <View style={[styles.sparkle, styles.sparkleBR]}>
                <MaterialIcons name="auto-awesome" size={20} color={colors.amber400} />
              </View>

              <View style={styles.glassFrameOuter}>
                <View style={styles.glassHalo} pointerEvents="none" />
                <View style={styles.glassFrame}>
                  <CameraView
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    selectedLens={selectedLens}
                    onAvailableLensesChanged={(e: any) => {
                      if (selectedLens) return;
                      const lenses: string[] | undefined = e?.lenses ?? e?.nativeEvent?.lenses;
                      if (!lenses?.length) return;
                      // Prefer the standard wide-angle lens; avoid ultra-wide and telephoto.
                      const normal =
                        lenses.find((l) => /wide/i.test(l) && !/ultra/i.test(l)) ??
                        lenses.find((l) => !/(ultra|telephoto)/i.test(l)) ??
                        lenses[0];
                      if (normal) setSelectedLens(normal);
                    }}
                  />
                  <LinearGradient
                    colors={[
                      'rgba(255,225,140,0.18)',
                      'transparent',
                      'transparent',
                      'rgba(0,0,0,0.35)',
                    ]}
                    locations={[0, 0.25, 0.7, 1]}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />

                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.characterWrap,
                      {
                        opacity: characterAnim,
                        transform: [
                          {
                            translateY: characterAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [40, 0],
                            }),
                          },
                          { scale: characterAnim },
                        ],
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.burstGlow,
                        {
                          opacity: glowAnim,
                          transform: [
                            {
                              scale: glowAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.6, 1.8],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <View style={styles.characterGlow} />
                    <Animated.View
                      style={[
                        styles.character,
                        {
                          shadowOpacity: glowAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.7, 1],
                          }),
                          shadowRadius: glowAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 60],
                          }),
                        },
                      ]}
                    >
                      <MaterialIcons name="auto-awesome" size={64} color={colors.secondary} />
                    </Animated.View>
                    <Text style={styles.characterName}>Jiskřička</Text>
                  </Animated.View>
                </View>
              </View>
            </View>

            <View style={styles.hint}>
              <Text style={styles.hintHeadline}>Skrz tohle sklíčko je Jiskřička vidět</Text>
              <Text style={styles.hintBody}>
                Pomalu se rozhlédněte a chvilku stůjte. Sama vykoukne.
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.round(steadyProgress * 100)}%` },
                  ]}
                />
              </View>
              <Pressable
                onPress={handleManualTrigger}
                style={({ pressed }) => [styles.skipBtn, pressed && styles.btnPressed]}
              >
                <Text style={styles.skipBtnText}>Vyvolat Jiskřičku ručně</Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>

      {storyVisible && (
        <StoryOverlay
          stop={stop}
          hero={hero}
          isLastStop={isLastStop}
          backgroundUri={frozenFrameUri}
          onContinue={onContinue}
          onInteractionConfirmed={celebrate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  safeArea: { flex: 1 },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: 'rgba(12,16,15,0.55)',
  },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: {
    color: colors.amber400,
    fontFamily: 'Newsreader_700Bold',
    fontSize: 16,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  glassStage: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 12,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  glassFrameOuter: {
    aspectRatio: 0.78,
    borderRadius: 36,
    shadowColor: colors.secondary,
    shadowOpacity: 0.7,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    elevation: 24,
  },
  glassFrame: {
    flex: 1,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: 'rgba(251,191,36,0.7)',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  glassHalo: {
    position: 'absolute',
    top: -18,
    left: -18,
    right: -18,
    bottom: -18,
    borderRadius: 54,
    backgroundColor: 'rgba(233,195,73,0.12)',
  },
  sparkle: {
    position: 'absolute',
    opacity: 0.85,
  },
  sparkleTL: { top: 6, left: 8 },
  sparkleTR: { top: 36, right: 6 },
  sparkleBL: { bottom: 40, left: 4 },
  sparkleBR: { bottom: 8, right: 10 },
  hint: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    alignItems: 'center',
    gap: 10,
  },
  hintHeadline: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 22,
    lineHeight: 28,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
  hintBody: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 6,
    maxWidth: 320,
  },
  progressTrack: {
    width: 220,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
  },
  characterWrap: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  characterGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 90,
    backgroundColor: 'rgba(233,195,73,0.25)',
  },
  burstGlow: {
    position: 'absolute',
    top: -60,
    left: -60,
    right: -60,
    bottom: -60,
    borderRadius: 130,
    backgroundColor: 'rgba(255,225,140,0.55)',
  },
  character: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(233,195,73,0.7)',
    backgroundColor: 'rgba(12,16,15,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOpacity: 0.7,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  characterName: {
    marginTop: 12,
    fontFamily: 'Newsreader_700Bold',
    fontSize: 18,
    letterSpacing: 2,
    fontStyle: 'italic',
    color: colors.amber400,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 8,
  },
  permissionWrap: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  permissionTitle: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 24,
    color: colors.onBackground,
    textAlign: 'center',
  },
  permissionBody: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 16,
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
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 2.5,
    color: colors.onSecondaryContainer,
  },
  skipBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  skipBtnText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 12,
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    textDecorationLine: 'underline',
  },
  btnPressed: { transform: [{ scale: 0.97 }], opacity: 0.85 },
});
