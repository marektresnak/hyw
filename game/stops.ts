import { ImageSourcePropType } from 'react-native';

export type Stop = {
  id: number;
  title: string;
  introClue: string;
  storyParagraphs: string[];
  interactionPrompt: string;
  interactionLabel: string;
  lat: number;
  lon: number;
  image: ImageSourcePropType;
};

export const STOPS: Stop[] = [
  {
    id: 0,
    title: 'Borovice',
    introClue:
      'Najdi vysokou borovici na začátku parku Vlněna a zastav se pod ní.',
    storyParagraphs: [
      'Pssst, slyšíte to šustění? To si borovice šeptají staré tajemství.',
      'V noci tudy proletěla malá jiskřička radosti, ale ztratila osm třpytivých kousků. Bez nich je tady všechno trošku tišší.',
      'Pomůžete nám je najít? První stopa voní po jehličí a vede tam, kde bydlí maličcí broučci.',
    ],
    interactionPrompt: 'Zaposlouchej se. Slyšíš ten šepot mezi jehličím?',
    interactionLabel: 'Slyším šepot',
    lat: 49.188603,
    lon: 16.617013,
    image: require('../assets/photos/borovice.jpg'),
  },
  {
    id: 1,
    title: 'Hmyzí domeček',
    introClue:
      'Hledej malý dřevěný dům s klacíky a šiškami. Tam bydlí broučci, včelky a další drobní sousedé.',
    storyParagraphs: [
      'Tady bydlí broučci, včelky a další drobní sousedé.',
      'Jeden z nich našel první třpytku schovanou mezi klacíky. Ale neumí ji odnést, má na to moc malé nožičky.',
      'Výborně, první kousek máme! Broučci říkají, že další stopa se kutálela pryč... kulatá jako kolo.',
    ],
    interactionPrompt: 'Pozdrav broučky tichounkým "ahoj".',
    interactionLabel: 'Ahoj, broučci',
    lat: 49.188697,
    lon: 16.616597,
    image: require('../assets/photos/hmyzi-domecek.jpg'),
  },
  {
    id: 2,
    title: 'Kola před Vlněnou',
    introClue:
      'Hledej místo, kde jsou kola, kola, kolečka — u vstupu do velké budovy Vlněny.',
    storyParagraphs: [
      'Kola, kola, kolečka!',
      'Tady se druhý kousek jiskřičky zatočil tak rychle, až se mu z toho zamotala hlava.',
      'Musíme ho zastavit jemným kouzlem: raz, dva, tři, stojíme!',
      'Paráda. Teď už svítí druhý kousek. Další prý hledá barvy, vůni a místo, kde se schovávají květiny.',
    ],
    interactionPrompt: 'Spolu řekneme: raz, dva, tři, stojíme!',
    interactionLabel: 'Raz, dva, tři, stojíme!',
    lat: 49.189145,
    lon: 16.616853,
    image: require('../assets/photos/kola.jpg'),
  },
];

export function distanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export const ARRIVAL_RADIUS_METERS = 25;
