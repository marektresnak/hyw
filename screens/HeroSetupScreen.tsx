import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
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

type Props = {
  hero: Hero;
  onSave: (hero: Hero) => void;
  onCancel: () => void;
};

export function HeroSetupScreen({ hero, onSave, onCancel }: Props) {
  const [name, setName] = useState(hero.name);
  const [photoUri, setPhotoUri] = useState<string | null>(hero.photoUri);

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
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const canSave = name.trim().length > 0 && photoUri !== null;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ name: name.trim(), photoUri });
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
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.headline}>Představte svého hrdinu</Text>
            <Text style={styles.body}>
              Vyberte tvář a zvolte jméno, pod kterým bude hrdina putovat lesy Eldervoodu.
            </Text>

            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [styles.avatarWrap, pressed && styles.btnPressed]}
            >
              <View style={styles.avatarGlow} />
              <View style={styles.avatar}>
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.avatarImage} />
                ) : (
                  <MaterialIcons name="add-a-photo" size={44} color={colors.secondary} />
                )}
              </View>
            </Pressable>
            <Text style={styles.avatarHint}>
              {photoUri ? 'Klepněte pro změnu fotky' : 'Klepněte a vyberte fotku tváře'}
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>Jméno hrdiny</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="např. Eldar Statečný"
                placeholderTextColor="rgba(195,200,193,0.45)"
                style={styles.input}
                maxLength={32}
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
            </View>

          </ScrollView>

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
              <MaterialIcons
                name="check"
                size={20}
                color={canSave ? colors.onSecondaryContainer : 'rgba(52,40,0,0.5)'}
              />
              <Text
                style={[
                  styles.primaryBtnText,
                  !canSave && styles.primaryBtnTextDisabled,
                ]}
              >
                ULOŽIT HRDINU
              </Text>
            </Pressable>

            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
            >
              <Text style={styles.secondaryBtnText}>Zpět</Text>
            </Pressable>
          </View>
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
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: colors.onBackground,
    textAlign: 'center',
    textShadowColor: 'rgba(233,195,73,0.4)',
    textShadowRadius: 15,
    maxWidth: 320,
  },
  body: {
    marginTop: 8,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  avatarWrap: {
    marginTop: 20,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 70,
    backgroundColor: 'rgba(233,195,73,0.18)',
  },
  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
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
    marginTop: 8,
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    letterSpacing: 0.3,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  field: {
    marginTop: 20,
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 8,
    backgroundColor: 'rgba(12,16,15,0.92)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(120,53,15,0.25)',
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
