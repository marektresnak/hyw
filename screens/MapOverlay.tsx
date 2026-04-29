import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const MAP_IMAGE = require('../assets/map.png');

export function MapOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SafeAreaView
        pointerEvents="box-none"
        style={StyleSheet.absoluteFill}
      >
        <View pointerEvents="box-none" style={styles.buttonWrap}>
          <Pressable
            onPress={() => setOpen(true)}
            hitSlop={8}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            accessibilityLabel="Otevřít mapu"
          >
            <MaterialIcons name="map" size={26} color={colors.secondary} />
          </Pressable>
        </View>
      </SafeAreaView>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
        statusBarTranslucent
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />
          <SafeAreaView style={styles.modalSafe} pointerEvents="box-none">
            <View style={styles.header} pointerEvents="box-none">
              <Text style={styles.title}>Mapa Eldervoodu</Text>
              <Pressable
                onPress={() => setOpen(false)}
                hitSlop={12}
                style={({ pressed }) => [styles.closeBtn, pressed && styles.buttonPressed]}
                accessibilityLabel="Zavřít mapu"
              >
                <MaterialIcons name="close" size={26} color={colors.onBackground} />
              </Pressable>
            </View>
            <View style={styles.mapWrap} pointerEvents="none">
              <Image
                source={MAP_IMAGE}
                style={styles.mapImage}
                resizeMode="contain"
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: 12,
    paddingTop: 12,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12,16,15,0.78)',
    borderWidth: 1.5,
    borderColor: 'rgba(233,195,73,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.85,
  },
  modalRoot: {
    flex: 1,
    backgroundColor: 'rgba(6,10,9,0.92)',
  },
  modalSafe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontFamily: 'Newsreader_700Bold',
    fontSize: 20,
    color: colors.amber400,
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50,54,53,0.7)',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  mapWrap: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  mapImage: {
    flex: 1,
    width: '100%',
  },
});
