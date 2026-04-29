import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import {
  ARRIVAL_RADIUS_METERS,
  Stop,
  distanceMeters,
} from '../game/stops';

type Props = {
  stop: Stop;
  stopIndex: number;
  totalStops: number;
  onArrived: () => void;
  onExit: () => void;
};

export function ClueScreen({
  stop,
  stopIndex,
  totalStops,
  onArrived,
  onExit,
}: Props) {
  const [checking, setChecking] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const checkLocation = async () => {
    setChecking(true);
    setHint(null);
    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          'Potřebujeme polohu',
          'Bez povolení polohy nezvládneme poznat, že jsi na zastávce.',
        );
        setChecking(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const dist = distanceMeters(
        pos.coords.latitude,
        pos.coords.longitude,
        stop.lat,
        stop.lon,
      );
      if (dist <= ARRIVAL_RADIUS_METERS) {
        onArrived();
      } else {
        setHint(
          `Ještě to není ono. Jsi asi ${Math.round(dist)} m daleko. Hledej dál!`,
        );
      }
    } catch (err) {
      setHint('Hmm, polohu se nepodařilo získat. Zkus to ještě jednou.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={stop.image}
        style={StyleSheet.absoluteFill}
        imageStyle={styles.heroImage}
        blurRadius={6}
      >
        <LinearGradient
          colors={['rgba(2,44,34,0.55)', colors.background, colors.background]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.brandText}>Potoulky</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <View style={styles.body}>
          <Text style={styles.stepLabel}>
            Zastávka {stopIndex + 1} z {totalStops}
          </Text>
          <Text style={styles.headline}>{stop.title}</Text>

          <View style={styles.clueCard}>
            <MaterialIcons
              name="auto-awesome"
              size={28}
              color={colors.secondary}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.clueText}>{stop.introClue}</Text>
          </View>

          {hint && <Text style={styles.hint}>{hint}</Text>}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={checkLocation}
            disabled={checking}
            style={({ pressed }) => [
              styles.primaryBtn,
              checking && styles.primaryBtnDisabled,
              pressed && !checking && styles.btnPressed,
            ]}
          >
            {checking ? (
              <ActivityIndicator color={colors.onSecondaryContainer} />
            ) : (
              <MaterialIcons
                name="my-location"
                size={20}
                color={colors.onSecondaryContainer}
              />
            )}
            <Text style={styles.primaryBtnText}>
              {checking ? 'KONTROLUJI…' : 'JSEM NA MÍSTĚ'}
            </Text>
          </Pressable>
          <Pressable
            onPress={onArrived}
            style={({ pressed }) => [styles.skipBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.skipBtnText}>Přeskočit kontrolu (test)</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  heroImage: { transform: [{ scale: 1.1 }] },
  safeArea: { flex: 1 },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: 'rgba(12,16,15,0.85)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(120,53,15,0.3)',
  },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: {
    color: colors.amber400,
    fontFamily: 'Newsreader_700Bold',
    fontSize: 16,
    letterSpacing: 3,
    fontStyle: 'italic',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  stepLabel: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 12,
    letterSpacing: 2.5,
    color: colors.amber400,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headline: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.7,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(233,195,73,0.4)',
    textShadowRadius: 15,
    marginBottom: 32,
  },
  clueCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(39,43,42,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(233,195,73,0.35)',
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  clueText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 18,
    lineHeight: 26,
    color: colors.onBackground,
    textAlign: 'center',
  },
  hint: {
    marginTop: 20,
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: colors.amber400,
    textAlign: 'center',
    maxWidth: 320,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 8,
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
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  primaryBtnDisabled: {
    backgroundColor: 'rgba(175,141,17,0.6)',
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
