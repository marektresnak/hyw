import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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

const colors = {
  background: '#101413',
  onBackground: '#e0e3e1',
  onSurfaceVariant: '#c3c8c1',
  surfaceContainerHighest: '#323635',
  outlineVariant: '#434843',
  secondary: '#e9c349',
  secondaryContainer: '#af8d11',
  onSecondaryContainer: '#342800',
  primary: '#b4cdb8',
  amber400: '#fbbf24',
};

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8SSyQGQqE3GiAB5UNCDqup9pRjIP7CeH9reI_A1BPAx-G9QsXnTyTWuxQds_d_e305juAOYBNY-34NbAmrkV9pLr434d2bH1WjZWsAaEm5atwT5qNUbR9eeUOpUIirVcpxPnp5Y9LOspOUJ8I5QociQ9eFgyP1ErcVepu_Ks-ueemiV7iwXLJOKyBAAnFUoZdztOT89u9pdclUUNHzGIvHGN8gvtdXxEGzdEXFtvXtIVA-LczNHGaqeVtTgMNWVUTl53SP3YHPfg';

export default function App() {
  const [fontsLoaded] = useFonts({
    Newsreader_600SemiBold,
    Newsreader_700Bold,
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={StyleSheet.absoluteFill}
        imageStyle={styles.heroImage}
        blurRadius={2}
      >
        <LinearGradient
          colors={['rgba(2,44,34,0.55)', colors.background, colors.background]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topNav}>
          <View style={styles.brand}>
            <MaterialIcons name="explore" size={22} color={colors.amber400} />
            <Text style={styles.brandText}>Potoulky</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.artifactWrap}>
            <View style={styles.artifactGlow} />
            <View style={styles.artifact}>
              <MaterialIcons name="auto-awesome" size={48} color={colors.secondary} />
            </View>
          </View>
        </View>

        <View style={styles.bottomBlock}>
          <Text style={styles.headline}>Vítej hrdino, jaké bude další dobrodružství?</Text>
          <Text style={styles.body}>
            Tvé kroky rezonují prastarým lesem. Osud Eldervoodu čeká na tvé rozhodnutí.
          </Text>

          <View style={styles.actions}>
            <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}>
              <MaterialIcons name="play-arrow" size={20} color={colors.onSecondaryContainer} />
              <Text style={styles.primaryBtnText}>ZAČÍT</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}>
              <MaterialIcons name="shield" size={20} color={colors.primary} />
              <Text style={styles.secondaryBtnText}>Představit hrdinu</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    transform: [{ scale: 1.1 }],
  },
  safeArea: {
    flex: 1,
  },
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
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    color: colors.amber400,
    fontFamily: 'Newsreader_700Bold',
    fontSize: 16,
    letterSpacing: 3,
    fontStyle: 'italic',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  artifactWrap: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBlock: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  artifactGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 65,
    backgroundColor: 'rgba(233,195,73,0.18)',
  },
  artifact: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: 'rgba(233,195,73,0.5)',
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
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
    maxWidth: 360,
  },
  body: {
    marginTop: 16,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  actions: {
    marginTop: 56,
    width: '100%',
    maxWidth: 320,
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
  primaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 2.5,
    color: colors.onSecondaryContainer,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(39,43,42,0.6)',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 4,
    paddingVertical: 18,
  },
  secondaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 0.5,
    color: colors.onBackground,
  },
  btnPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },
});
