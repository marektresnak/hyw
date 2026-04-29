import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
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
  const [status, setStatus] = useState<'init' | 'denied' | 'searching' | 'tracking'>(
    'init',
  );
  const [distance, setDistance] = useState<number | null>(null);
  const arrivedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let sub: Location.LocationSubscription | null = null;

    (async () => {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;
      if (!perm.granted) {
        setStatus('denied');
        return;
      }
      setStatus('searching');
      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1500,
          distanceInterval: 2,
        },
        (pos) => {
          if (arrivedRef.current) return;
          const d = distanceMeters(
            pos.coords.latitude,
            pos.coords.longitude,
            stop.lat,
            stop.lon,
          );
          setDistance(d);
          setStatus('tracking');
          if (d <= ARRIVAL_RADIUS_METERS) {
            arrivedRef.current = true;
            sub?.remove();
            onArrived();
          }
        },
      );
    })();

    return () => {
      cancelled = true;
      sub?.remove();
    };
  }, [stop.lat, stop.lon, onArrived]);

  const distanceLabel =
    status === 'denied'
      ? 'Bez polohy to nepoznáme. Otevřete nastavení a povolte polohu.'
      : status === 'init' || distance == null
      ? 'Hledám vaši polohu…'
      : `Asi ${Math.round(distance)} m daleko. Až tam dojdete, postavička vyskočí sama.`;

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
            <Text style={styles.brandText}>Kouzelná Vlněna</Text>
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

          <View style={styles.statusRow}>
            <MaterialIcons
              name={status === 'denied' ? 'location-off' : 'my-location'}
              size={18}
              color={status === 'denied' ? colors.amber400 : colors.onSurfaceVariant}
            />
            <Text style={styles.statusText}>{distanceLabel}</Text>
          </View>
        </View>

        <View style={styles.actions}>
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
  statusRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: 320,
  },
  statusText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    lineHeight: 18,
    color: colors.onSurfaceVariant,
    flexShrink: 1,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 8,
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
