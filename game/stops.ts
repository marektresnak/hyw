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
      'V noci tudy proletěla malá jiskřička radosti, ale ztratila sedm třpytivých kousků. Bez nich je tady všechno trošku tišší.',
      'Pomůžete nám kousky jiskřičky najít? První stopa voní po jehličí a navede nás dál, tam, kde bydlí maličcí broučci.',
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
  {
    id: 3,
    title: 'Zahrádka barevných kalíšků',
    introClue:
      'Hledej malou zahrádku s tulipány a slunečnicemi v barevných kalíšcích.',
    storyParagraphs: [
      'Tady je to jako malá zahrádka uprostřed města.',
      'Tulipány drží třetí kousek jiskřičky ve svých barevných kalíšcích. Nechtějí ho pustit, dokud někdo neřekne něco hezkého.',
      'Co třeba, že jsou moc roztomilé? Tak jim zamáváme a poděkujeme.',
      'Třetí kousek máme! Slunečnice se otáčejí za sluncem a dívají se na náš další cíl. Čtvrtý kousek se schovává ve fialových květech nad vchodem do L’Osterie.',
    ],
    interactionPrompt: 'Zamávej tulipánům a řekni jim, že jsou moc hezké.',
    interactionLabel: 'Ahoj, tulipáni',
    lat: 49.189322,
    lon: 16.616883,
    image: require('../assets/photos/kalisky.jpg'),
  },
  {
    id: 4,
    title: 'Brána fialových květů',
    introClue:
      'Najdi vchod do L’Osterie, kde nad hlavou visí fialové květy jako kouzelné závěsy.',
    storyParagraphs: [
      'Podívejte, květy visí jako kouzelné závěsy.',
      'Tady spí čtvrtý kousek jiskřičky, zabalený do fialové vůně. Musíme mluvit potichu, aby se nelekl.',
      'Ššš... počkeeej... a už je u nás.',
      'A vítr nám přinesl zprávu: u vysokého komína se probudil kouřový drak.',
    ],
    interactionPrompt: 'Zašeptej tichounké "ššš", ať se kousek neprobudí lekem.',
    interactionLabel: 'Ššš...',
    lat: 49.190058,
    lon: 16.617,
    image: require('../assets/photos/fialove-kvety.jpg'),
  },
  {
    id: 5,
    title: 'Věž kouřového draka',
    introClue:
      'Najdi vysoký komín, který stojí jako věž. Kolem se kroutí kouřový drak.',
    storyParagraphs: [
      'Tady stojí vysoký komín jako věž. A kolem něj se kroutí kouřový drak!',
      'Nebojte, není zlý, jen hlídá pátý a šestý kousek, protože si myslí, že jsou to jeho poklady.',
      'Ukážeme mu, že jsme stateční pomocníci: dupneme, foukneme a řekneme: draku, pusť světýlko ven!',
      'Výborně, drak se usmál a ukázal cestu na hřiště.',
    ],
    interactionPrompt: 'Dupni, foukni a zavolej: draku, pusť světýlko ven!',
    interactionLabel: 'Draku, pusť světýlko ven!',
    lat: 49.190262,
    lon: 16.617858,
    image: require('../assets/photos/drak.jpg'),
  },
  {
    id: 6,
    title: 'Hřiště veselého dráčka',
    introClue:
      'Pokračuj na hřiště, kde tě čeká poslední kousek jiskřičky.',
    storyParagraphs: [
      'A jsme v cíli!',
      'A jéje, malý modrý dráček tady hlídá taky! Jak jenom poslední jiskřičku získáme?',
      'Nene, neporazíme dráčka silou, ale společně ho rozesmějeme. Pojďme: HAHAHA!',
      'Vidíte, dráček se směje s námi a předává nám poslední kousek jiskřičky. Jiskřička je celá! Teď může znovu rozsvítit radost všude kolem.',
      'A pohrajte si na tomhle kouzelném místě dosytosti. Děkujeme, malí dobrodruzi.',
    ],
    interactionPrompt: 'Spolu rozesmějeme dráčka: HAHAHA!',
    interactionLabel: 'HAHAHA!',
    lat: 49.189675,
    lon: 16.618145,
    image: require('../assets/photos/hriste.jpg'),
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
