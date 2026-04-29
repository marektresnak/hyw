Tohle je mobilní aplikace - interaktivní hra svázaná s reálným světem.

Základní myšlenka:
- Pobavit / edukovat děti na výletě v přírodě a na dalších zajímavých místech. 
- Hra děti provede přes konkrétní zastavení.
- Zastavení se pozná podle GPS lokality.
- Zastavení uživatel pozná sám podle indicie z předchozího kroku (popis místa, kompas, atd.) — appka **neběží na pozadí** a nedělá background geofencing. Uživatel si telefon vytáhne sám, až je na místě, appka pak zkontroluje GPS na popředí a potvrdí, že je správně.
- Po otevření appky na zastavení se zobrazí obrazovka s výhledem přes foťák a po ustálení obrazu (detekce přes gyroskop/akcelerometr) vyskočí postavička, která poví svoji část příběhu (často s informací k místu, kde se nachází) a zadá indicii na hledání dalšího místa.
- Indicie se můžou vázat k reálnýmu světu - třeba jděte ke staré studánce (s tím, že z místa je jasně patrné, kde studánka je), nebo může obsahovat malý interaktivní kompas, který udá směr dalšího pohybu.
- Zastavení je konečný počet a je potřeba je navštívit ve správném pořadí - na posledním příběh vyvrcholí.

Tech stack:
- React Native + Expo (managed workflow), spuštění přes Expo Go pro rychlý dev cyklus.
- Klíčové moduly: `expo-location` (foreground), `expo-camera`, `expo-sensors` (gyro pro detekci ustáleného obrazu), `expo-notifications` (jen lokální, in-app).
- Postavička jako 2D overlay nad camera view (PNG/Lottie/Rive), žádná skutečná AR (žádné ARKit/ARCore, žádné rozpoznávání plochy).