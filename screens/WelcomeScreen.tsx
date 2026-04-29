import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, HERO_IMAGE, Hero } from '../theme';

type Props = {
  hero: Hero;
  onIntroduceHero: () => void;
};

export function WelcomeScreen({ hero, onIntroduceHero }: Props) {
  const greeting = hero.name
    ? `Vítej ${hero.name}, jaké bude další dobrodružství?`
    : 'Vítej hrdino, jaké bude další dobrodružství?';

  return (
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
          <View style={styles.navSide} />
          <View style={styles.brand}>
            <MaterialIcons name="explore" size={22} color={colors.amber400} />
            <Text style={styles.brandText}>Potoulky</Text>
          </View>
          <View style={styles.navSide} />
        </View>

        <View style={styles.main}>
          <View style={styles.artifactWrap}>
            <View style={styles.artifactGlow} />
            <View style={styles.artifact}>
              {hero.photoUri ? (
                <Image source={{ uri: hero.photoUri }} style={styles.artifactImage} />
              ) : (
                <MaterialIcons name="auto-awesome" size={48} color={colors.secondary} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomBlock}>
          <Text style={styles.headline}>{greeting}</Text>
          <Text style={styles.body}>
            Tvé kroky rezonují prastarým lesem. Osud Eldervoodu čeká na tvé rozhodnutí.
          </Text>

          <View style={styles.actions}>
            <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}>
              <MaterialIcons name="play-arrow" size={20} color={colors.onSecondaryContainer} />
              <Text style={styles.primaryBtnText}>ZAČÍT</Text>
            </Pressable>

            <Pressable
              onPress={onIntroduceHero}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
            >
              <MaterialIcons name="shield" size={20} color={colors.primary} />
              <Text style={styles.secondaryBtnText}>Představit hrdinu</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
  navSide: {
    width: 32,
    height: 32,
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
    overflow: 'hidden',
    shadowColor: colors.secondary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  artifactImage: {
    width: '100%',
    height: '100%',
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
