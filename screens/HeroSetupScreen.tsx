import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, HERO_IMAGE, Hero } from '../theme';
import { generateHeroPortrait } from '../services/generateHeroPortrait';

type Props = {
  hero: Hero;
  onSave: (hero: Hero) => void;
  onCancel: () => void;
};

type SourcePhoto = {
  uri: string;
  base64: string;
  mimeType: string;
};

export function HeroSetupScreen({ hero, onSave, onCancel }: Props) {
  const [name, setName] = useState(hero.name);
  const [sourcePhoto, setSourcePhoto] = useState<SourcePhoto | null>(null);
  const [generating, setGenerating] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Potřebujeme přístup k fotkám',
        'Bez povolení nemůžeme nastavit tvář hrdiny.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets[0]) return;

    const asset = result.assets[0];
    if (!asset.base64) {
      Alert.alert('Chyba', 'Nepodařilo se načíst fotku.');
      return;
    }

    setSourcePhoto({
      uri: asset.uri,
      base64: asset.base64,
      mimeType: asset.mimeType ?? 'image/jpeg',
    });
  };

  const canSave = name.trim().length > 0 && sourcePhoto !== null && !generating;

  const handleSave = async () => {
    if (!canSave || !sourcePhoto) return;

    setGenerating(true);
    try {
      const portrait = await generateHeroPortrait({
        base64Photo: sourcePhoto.base64,
        mimeType: sourcePhoto.mimeType,
      });
      onSave({
        name: name.trim(),
        photoUri: `data:${portrait.mimeType};base64,${portrait.base64}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert('Kouzlo se nepovedlo', message);
    } finally {
      setGenerating(false);
    }
  };

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
          <Pressable
            onPress={onCancel}
            disabled={generating}
            hitSlop={12}
            style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.onBackground} />
          </Pressable>
          <View style={styles.brand}>
            <MaterialIcons name="explore" size={22} color={colors.amber400} />
            <Text style={styles.brandText}>Potoulky</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.headline}>Představ svého hrdinu</Text>
            <Text style={styles.body}>
              Vyber tvář a zvol jméno. Z fotky vykouzlíme portrét rytíře.
            </Text>

            <Pressable
              onPress={pickImage}
              disabled={generating}
              style={({ pressed }) => [styles.avatarWrap, pressed && styles.btnPressed]}
            >
              <View style={styles.avatarGlow} />
              <View style={styles.avatar}>
                {sourcePhoto ? (
                  <Image source={{ uri: sourcePhoto.uri }} style={styles.avatarImage} />
                ) : (
                  <MaterialIcons name="add-a-photo" size={44} color={colors.secondary} />
                )}
              </View>
            </Pressable>
            <Text style={styles.avatarHint}>
              {sourcePhoto ? 'Klepni pro změnu fotky' : 'Klepni a vyber fotku tváře'}
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>Jméno hrdiny</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                editable={!generating}
                placeholder="např. Eldar Statečný"
                placeholderTextColor="rgba(195,200,193,0.45)"
                style={styles.input}
                maxLength={32}
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={handleSave}
                disabled={!canSave}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  !canSave && styles.primaryBtnDisabled,
                  pressed && canSave && styles.btnPressed,
                ]}
              >
                {generating ? (
                  <>
                    <ActivityIndicator color={colors.onSecondaryContainer} />
                    <Text style={styles.primaryBtnText}>KRESLÍME HRDINU…</Text>
                  </>
                ) : (
                  <>
                    <MaterialIcons
                      name="auto-awesome"
                      size={20}
                      color={canSave ? colors.onSecondaryContainer : 'rgba(52,40,0,0.5)'}
                    />
                    <Text
                      style={[
                        styles.primaryBtnText,
                        !canSave && styles.primaryBtnTextDisabled,
                      ]}
                    >
                      VYKOUZLIT HRDINU
                    </Text>
                  </>
                )}
              </Pressable>

              <Pressable
                onPress={onCancel}
                disabled={generating}
                style={({ pressed }) => [
                  styles.secondaryBtn,
                  pressed && !generating && styles.btnPressed,
                  generating && styles.secondaryBtnDisabled,
                ]}
              >
                <Text style={styles.secondaryBtnText}>Zpět</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(233,195,73,0.4)',
    textShadowRadius: 15,
    maxWidth: 320,
  },
  body: {
    marginTop: 12,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  avatarWrap: {
    marginTop: 36,
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 80,
    backgroundColor: 'rgba(233,195,73,0.18)',
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
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
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarHint: {
    marginTop: 12,
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    letterSpacing: 0.3,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  field: {
    marginTop: 32,
    width: '100%',
    maxWidth: 320,
  },
  label: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    color: colors.amber400,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 16,
    color: colors.onBackground,
    backgroundColor: 'rgba(39,43,42,0.6)',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  actions: {
    marginTop: 40,
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
  primaryBtnDisabled: {
    backgroundColor: 'rgba(175,141,17,0.35)',
    borderColor: 'rgba(233,195,73,0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 2.5,
    color: colors.onSecondaryContainer,
  },
  primaryBtnTextDisabled: {
    color: 'rgba(52,40,0,0.5)',
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
    paddingVertical: 16,
  },
  secondaryBtnDisabled: {
    opacity: 0.4,
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
