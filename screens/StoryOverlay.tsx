import { useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, Hero } from '../theme';
import { Stop } from '../game/stops';

type Props = {
  stop: Stop;
  hero: Hero;
  isLastStop: boolean;
  onContinue: () => void;
  onInteractionConfirmed: () => void;
};

export function StoryOverlay({
  stop,
  hero,
  isLastStop,
  onContinue,
  onInteractionConfirmed,
}: Props) {
  const [paragraphCount, setParagraphCount] = useState(1);
  const [interactionDone, setInteractionDone] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(translate, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const allShown = paragraphCount >= stop.storyParagraphs.length;

  const onTapNextParagraph = () => {
    if (!allShown) {
      setParagraphCount((n) => n + 1);
    }
  };

  return (
    <Animated.View
      style={[
        styles.wrap,
        { opacity, transform: [{ translateY: translate }] },
      ]}
    >
      <View style={styles.heroBadgeRow}>
        <View style={styles.heroBadge}>
          {hero.photoUri ? (
            <Image source={{ uri: hero.photoUri }} style={styles.heroAvatar} />
          ) : (
            <MaterialIcons name="person" size={18} color={colors.secondary} />
          )}
        </View>
        <Text style={styles.heroBadgeText}>
          {hero.name ? `${hero.name} naslouchá` : 'Posloucháš…'}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.titleRow}>
          <MaterialIcons name="auto-awesome" size={20} color={colors.amber400} />
          <Text style={styles.title}>Jiskřička</Text>
        </View>

        <ScrollView
          style={{ maxHeight: 260 }}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        >
          {stop.storyParagraphs.slice(0, paragraphCount).map((p, idx) => (
            <Text key={idx} style={[styles.paragraph, idx > 0 && { marginTop: 12 }]}>
              {p}
            </Text>
          ))}
        </ScrollView>

        {!allShown ? (
          <Pressable
            onPress={onTapNextParagraph}
            style={({ pressed }) => [styles.tapHint, pressed && styles.btnPressed]}
          >
            <Text style={styles.tapHintText}>Klepni pro pokračování</Text>
            <MaterialIcons name="arrow-forward" size={16} color={colors.amber400} />
          </Pressable>
        ) : !interactionDone ? (
          <View style={styles.interactionBlock}>
            <Text style={styles.interactionPrompt}>{stop.interactionPrompt}</Text>
            <Pressable
              onPress={() => {
                setInteractionDone(true);
                onInteractionConfirmed();
              }}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            >
              <MaterialIcons
                name="favorite"
                size={18}
                color={colors.onSecondaryContainer}
              />
              <Text style={styles.primaryBtnText}>{stop.interactionLabel}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.interactionBlock}>
            <Text style={styles.sparkleEarned}>+1 kousek jiskřičky ✨</Text>
            <Pressable
              onPress={onContinue}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            >
              <MaterialIcons
                name={isLastStop ? 'flag' : 'arrow-forward'}
                size={18}
                color={colors.onSecondaryContainer}
              />
              <Text style={styles.primaryBtnText}>
                {isLastStop ? 'DOKONČIT DEMO' : 'NAJÍT DALŠÍ'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  heroBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(233,195,73,0.6)',
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroAvatar: { width: '100%', height: '100%' },
  heroBadgeText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.onBackground,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 6,
  },
  card: {
    backgroundColor: 'rgba(12,16,15,0.94)',
    borderTopWidth: 2,
    borderColor: 'rgba(233,195,73,0.4)',
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.secondary,
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 18,
    letterSpacing: 2,
    fontStyle: 'italic',
    color: colors.amber400,
  },
  paragraph: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 17,
    lineHeight: 26,
    color: colors.onBackground,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 4,
  },
  tapHintText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 12,
    letterSpacing: 2,
    color: colors.amber400,
    textTransform: 'uppercase',
  },
  interactionBlock: {
    marginTop: 16,
    gap: 12,
  },
  interactionPrompt: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  sparkleEarned: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 18,
    color: colors.amber400,
    textAlign: 'center',
    textShadowColor: 'rgba(233,195,73,0.4)',
    textShadowRadius: 12,
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
  },
  primaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 14,
    letterSpacing: 2.5,
    color: colors.onSecondaryContainer,
  },
  btnPressed: { transform: [{ scale: 0.97 }], opacity: 0.85 },
});
