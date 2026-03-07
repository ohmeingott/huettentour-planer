import { PrismaClient, BookingSystem, Difficulty, RoomType } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

interface RegionSeed {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: { name: string; altitude: number; lat: number; lng: number; capacity: number; imageUrl?: string }[]
  routes: { from: number; to: number; distance: number; ascent: number; descent: number; duration: number; difficulty: Difficulty }[]
}

const regions: RegionSeed[] = [
  {
    name: 'Stubaier Alpen',
    slug: 'stubaier-alpen',
    bounds: { minLat: 46.95, minLng: 11.05, maxLat: 47.15, maxLng: 11.45 },
    center: { lat: 47.05, lng: 11.25 },
    huts: [
      { name: 'Innsbrucker Hütte', altitude: 2369, lat: 47.0578, lng: 11.4103, capacity: 80, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Innsbrucker_Huette.jpg' },
      { name: 'Bremer Hütte', altitude: 2411, lat: 47.0403, lng: 11.4267, capacity: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Terrasse_der_Bremer_H%C3%BCtte.jpg/1280px-Terrasse_der_Bremer_H%C3%BCtte.jpg' },
      { name: 'Nürnberger Hütte', altitude: 2280, lat: 47.0233, lng: 11.4456, capacity: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/N%C3%BCrnberger_H%C3%BCtte_2017.jpg' },
      { name: 'Sulzenau Hütte', altitude: 2191, lat: 47.0311, lng: 11.3889, capacity: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/14.Sulzenau-Ost.jpg/1280px-14.Sulzenau-Ost.jpg' },
      { name: 'Dresdner Hütte', altitude: 2308, lat: 47.0067, lng: 11.3500, capacity: 120, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Dresdner_H%C3%BCtte1.JPG' },
      { name: 'Neue Regensburger Hütte', altitude: 2286, lat: 47.0456, lng: 11.3667, capacity: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Neue_Regensburger_Huette_%28Terassenansicht%29.jpg' },
      { name: 'Franz-Senn-Hütte', altitude: 2147, lat: 47.0833, lng: 11.3167, capacity: 150, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/FranzSennHuette.jpg' },
      { name: 'Starkenburger Hütte', altitude: 2237, lat: 47.0889, lng: 11.3000, capacity: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/StarkenburgerHuette.jpg' },
      { name: 'Elferhütte', altitude: 2080, lat: 47.0944, lng: 11.3222, capacity: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/ElferH-SW.jpg' },
      { name: 'Mannheimer Hütte (Stubai)', altitude: 2007, lat: 47.0622, lng: 11.2833, capacity: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/A-V_-_Mannheimer_H%C3%BCtte.jpg' },
      { name: 'Hildesheimer Hütte', altitude: 2899, lat: 46.9989, lng: 11.3833, capacity: 56, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Hildesheimer_H%C3%BCtte_%284858307114%29.jpg' },
      { name: 'Siegerlandhütte', altitude: 2710, lat: 46.9911, lng: 11.4000, capacity: 48, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Siegerlandh%C3%BCtte.jpg' },
      { name: 'Amberger Hütte', altitude: 2135, lat: 47.0144, lng: 11.2667, capacity: 72, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Exkursion_zur_Amberger_H%C3%BCtte_14.jpg' },
      { name: 'Westfalenhaus', altitude: 2273, lat: 47.0267, lng: 11.2500, capacity: 54, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/WestfalenhausSommer.jpg' },
      { name: 'Pforzheimer Hütte', altitude: 2308, lat: 47.0378, lng: 11.2833, capacity: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Pforzheimer_H%C3%BCtte.jpg' },
    ],
    routes: [
      { from: 0, to: 1, distance: 5.2, ascent: 450, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 1, to: 2, distance: 6.8, ascent: 380, descent: 510, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 4.5, ascent: 320, descent: 410, duration: 3.0, difficulty: Difficulty.easy },
      { from: 3, to: 5, distance: 5.0, ascent: 480, descent: 380, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 5, to: 6, distance: 7.2, ascent: 350, descent: 490, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 6, to: 7, distance: 3.8, ascent: 290, descent: 200, duration: 2.5, difficulty: Difficulty.easy },
      { from: 7, to: 8, distance: 2.5, ascent: 150, descent: 310, duration: 1.5, difficulty: Difficulty.easy },
      { from: 6, to: 9, distance: 6.0, ascent: 420, descent: 560, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 4, distance: 5.5, ascent: 520, descent: 400, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 4, to: 10, distance: 4.2, ascent: 680, descent: 90, duration: 3.5, difficulty: Difficulty.difficult },
      { from: 10, to: 11, distance: 3.5, ascent: 200, descent: 390, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 11, to: 2, distance: 6.0, ascent: 350, descent: 780, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 9, to: 12, distance: 5.8, ascent: 380, descent: 250, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 12, to: 13, distance: 4.0, ascent: 340, descent: 200, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 13, to: 14, distance: 3.5, ascent: 280, descent: 250, duration: 2.5, difficulty: Difficulty.easy },
      { from: 14, to: 5, distance: 4.8, ascent: 350, descent: 370, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 0, to: 5, distance: 7.0, ascent: 520, descent: 600, duration: 5.0, difficulty: Difficulty.moderate },
      { from: 8, to: 6, distance: 2.5, ascent: 310, descent: 150, duration: 2.0, difficulty: Difficulty.easy },
    ],
  },
  {
    name: 'Zillertaler Alpen',
    slug: 'zillertal',
    bounds: { minLat: 46.90, minLng: 11.65, maxLat: 47.20, maxLng: 12.10 },
    center: { lat: 47.05, lng: 11.87 },
    huts: [
      { name: 'Olperer Hütte', altitude: 2389, lat: 47.0192, lng: 11.7008, capacity: 72, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Olperer_H%C3%BCtte_%26_Schlegeisspeicher_Panorama.jpg/1280px-Olperer_H%C3%BCtte_%26_Schlegeisspeicher_Panorama.jpg' },
      { name: 'Friesenberghaus', altitude: 2498, lat: 47.0139, lng: 11.7275, capacity: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Friesenberghaus_2023.jpg' },
      { name: 'Furtschaglhaus', altitude: 2295, lat: 47.0025, lng: 11.7456, capacity: 66, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Furtschaglhaus_gesamtansicht.jpg' },
      { name: 'Berliner Hütte', altitude: 2042, lat: 47.0289, lng: 11.7875, capacity: 180, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Berliner_H%C3%BCtte_%28DSC00513%29.jpg' },
      { name: 'Greizer Hütte', altitude: 2227, lat: 47.0117, lng: 11.8183, capacity: 86, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Greizerh%C3%BCtte.jpg' },
      { name: 'Kasseler Hütte', altitude: 2178, lat: 47.0211, lng: 11.8558, capacity: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kasseler_H%C3%BCtte.jpg/1280px-Kasseler_H%C3%BCtte.jpg' },
      { name: 'Edelhütte', altitude: 2238, lat: 47.0533, lng: 11.8300, capacity: 48, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Karl-von-Edel-Huette.jpg/1280px-Karl-von-Edel-Huette.jpg' },
      { name: 'Karl-von-Edel-Hütte', altitude: 2238, lat: 47.0400, lng: 11.8475, capacity: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Karl-von-Edel-Huette.jpg/1280px-Karl-von-Edel-Huette.jpg' },
      { name: 'Plauener Hütte', altitude: 2364, lat: 47.0067, lng: 11.7533, capacity: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Plauenerhuette_2020.jpg' },
      { name: 'Gamshütte', altitude: 1921, lat: 47.0739, lng: 11.8017, capacity: 55, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Hoher_riffler_friesenbergscharte_friesenberghaus_normalweg_wesendlkar_petersk%C3%B6pfel.jpg/1280px-Hoher_riffler_friesenbergscharte_friesenberghaus_normalweg_wesendlkar_petersk%C3%B6pfel.jpg' },
      { name: 'Dominikushütte', altitude: 1805, lat: 47.0400, lng: 11.7050, capacity: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/AUT_%E2%80%94_Tirol_%E2%80%94_Bezirk_Schwaz_%E2%80%94_Gemeinde_Finkenberg_%E2%80%94_Dornauberg_104_%28Alpengasthaus_Dominikush%C3%BCtte%29_2023-08-14_Mattes.jpg/1280px-AUT_%E2%80%94_Tirol_%E2%80%94_Bezirk_Schwaz_%E2%80%94_Gemeinde_Finkenberg_%E2%80%94_Dornauberg_104_%28Alpengasthaus_Dominikush%C3%BCtte%29_2023-08-14_Mattes.jpg' },
      { name: 'Pfitscherjoch-Haus', altitude: 2276, lat: 46.9950, lng: 11.6700, capacity: 65, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Pfitscher-Joch-H.jpg' },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.2, ascent: 280, descent: 170, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 1, to: 2, distance: 4.5, ascent: 200, descent: 400, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 2, to: 8, distance: 3.0, ascent: 250, descent: 180, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 5.8, ascent: 350, descent: 600, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 4, distance: 6.5, ascent: 520, descent: 330, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 4, to: 5, distance: 5.2, ascent: 380, descent: 430, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 5, to: 7, distance: 4.8, ascent: 320, descent: 260, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 7, to: 6, distance: 3.5, ascent: 210, descent: 210, duration: 2.0, difficulty: Difficulty.easy },
      { from: 6, to: 9, distance: 5.0, ascent: 180, descent: 500, duration: 3.0, difficulty: Difficulty.easy },
      { from: 3, to: 7, distance: 5.5, ascent: 450, descent: 250, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 0, to: 10, distance: 4.0, ascent: 150, descent: 740, duration: 2.5, difficulty: Difficulty.easy },
      { from: 0, to: 11, distance: 5.5, ascent: 350, descent: 460, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 9, to: 3, distance: 6.2, ascent: 400, descent: 280, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 8, to: 3, distance: 4.8, ascent: 200, descent: 520, duration: 3.5, difficulty: Difficulty.moderate },
    ],
  },
  {
    name: 'Ötztaler Alpen',
    slug: 'oetztal',
    bounds: { minLat: 46.70, minLng: 10.60, maxLat: 47.00, maxLng: 11.10 },
    center: { lat: 46.85, lng: 10.85 },
    huts: [
      { name: 'Vernagthütte', altitude: 2755, lat: 46.8444, lng: 10.7667, capacity: 80, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vernagt_H%C3%BCtte.JPG' },
      { name: 'Hochjoch-Hospiz', altitude: 2412, lat: 46.8278, lng: 10.7917, capacity: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Hochjochhospiz_2018.jpg' },
      { name: 'Brandenburger Haus', altitude: 3272, lat: 46.8347, lng: 10.7369, capacity: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Brandenburger_Haus_HQ.jpg' },
      { name: 'Martin-Busch-Hütte', altitude: 2501, lat: 46.8042, lng: 10.8600, capacity: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Martin-Busch-H%C3%BCtte_2020.jpg' },
      { name: 'Similaunhütte', altitude: 3019, lat: 46.7833, lng: 10.8667, capacity: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Die_Similaun_Schutzh%C3%BCtte.jpg' },
      { name: 'Schöne Aussicht', altitude: 2842, lat: 46.7722, lng: 10.8100, capacity: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sch%C3%B6ne_Aussicht_H%C3%BCtte_H%C3%BCttenschild.jpg/1280px-Sch%C3%B6ne_Aussicht_H%C3%BCtte_H%C3%BCttenschild.jpg' },
      { name: 'Bella Vista', altitude: 2845, lat: 46.7650, lng: 10.8283, capacity: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sch%C3%B6ne_Aussicht_H%C3%BCtte_H%C3%BCttenschild.jpg/1280px-Sch%C3%B6ne_Aussicht_H%C3%BCtte_H%C3%BCttenschild.jpg' },
      { name: 'Langtalereck Hütte', altitude: 2430, lat: 46.8583, lng: 10.8250, capacity: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/LangtalereckH-Schild.jpg/1280px-LangtalereckH-Schild.jpg' },
      { name: 'Ramolhaus', altitude: 3006, lat: 46.8500, lng: 10.7925, capacity: 55, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Ramolhaus.JPG' },
      { name: 'Erlanger Hütte', altitude: 2550, lat: 46.8850, lng: 10.7783, capacity: 62, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Erlanger_H%C3%BCtte.jpg' },
      { name: 'Braunschweiger Hütte', altitude: 2759, lat: 46.9125, lng: 10.8467, capacity: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/BraunschweigerH.jpg' },
    ],
    routes: [
      { from: 0, to: 1, distance: 4.5, ascent: 200, descent: 540, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 0, to: 2, distance: 3.8, ascent: 620, descent: 100, duration: 3.5, difficulty: Difficulty.difficult },
      { from: 0, to: 8, distance: 3.5, ascent: 350, descent: 100, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 1, to: 3, distance: 5.2, ascent: 400, descent: 310, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 1, to: 7, distance: 4.0, ascent: 280, descent: 260, duration: 3.0, difficulty: Difficulty.easy },
      { from: 3, to: 4, distance: 4.8, ascent: 580, descent: 60, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 5, distance: 6.0, ascent: 550, descent: 210, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 5, to: 6, distance: 2.5, ascent: 150, descent: 150, duration: 1.5, difficulty: Difficulty.easy },
      { from: 5, to: 4, distance: 4.2, ascent: 350, descent: 180, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 7, to: 0, distance: 3.5, ascent: 450, descent: 120, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 8, to: 9, distance: 4.0, ascent: 200, descent: 650, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 9, to: 10, distance: 5.5, ascent: 450, descent: 240, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 10, to: 7, distance: 6.2, ascent: 200, descent: 530, duration: 4.0, difficulty: Difficulty.moderate },
    ],
  },
  {
    name: 'Dolomiten',
    slug: 'dolomiten',
    bounds: { minLat: 46.25, minLng: 11.40, maxLat: 46.65, maxLng: 12.30 },
    center: { lat: 46.45, lng: 11.85 },
    huts: [
      { name: 'Schlernhaus', altitude: 2457, lat: 46.5064, lng: 11.5653, capacity: 120, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Tramonto_al_rifugio_Bolzano_%28cropped%29.jpg' },
      { name: 'Tierser-Alpl-Hütte', altitude: 2440, lat: 46.5000, lng: 11.5925, capacity: 55, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Tierser-Alpl-H%C3%BCtte%2C_2444_m%2C_2018-10-19.jpg' },
      { name: 'Grasleitenpasshütte', altitude: 2600, lat: 46.4875, lng: 11.6083, capacity: 42, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/140626_Grasleitenpassh%C3%BCtte.jpg' },
      { name: 'Rotwandhütte', altitude: 2280, lat: 46.4772, lng: 11.5783, capacity: 30, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Rotwandh%C3%BCtte_in_July_2015_01.jpg' },
      { name: 'Vajolet-Hütte', altitude: 2243, lat: 46.4650, lng: 11.6208, capacity: 75, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/140625_Rifugio_Vajolet.jpg' },
      { name: 'Preuss-Hütte', altitude: 2243, lat: 46.4636, lng: 11.6225, capacity: 35, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Rifugio_Preuss_02.jpg' },
      { name: 'Paolinahütte', altitude: 2125, lat: 46.4522, lng: 11.6400, capacity: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Paolina-H%C3%BCtte_Vorderansicht.JPG' },
      { name: 'Rif. Antermoia', altitude: 2497, lat: 46.4417, lng: 11.6700, capacity: 58, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Antermoia_refuge_2.jpg' },
      { name: 'Rif. Passo Principe', altitude: 2601, lat: 46.4558, lng: 11.6567, capacity: 28, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/140626_Grasleitenpassh%C3%BCtte.jpg' },
      { name: 'Kölner Hütte', altitude: 2337, lat: 46.4386, lng: 11.5917, capacity: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/K%C3%B6lner_H%C3%BCtte_vor_Rosengarten.jpg' },
      { name: 'Rif. Alpe di Tires', altitude: 2440, lat: 46.4917, lng: 11.5583, capacity: 65, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Tierser-Alpl-H%C3%BCtte%2C_2444_m%2C_2018-10-19.jpg' },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.5, ascent: 280, descent: 300, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 0, to: 10, distance: 2.8, ascent: 180, descent: 200, duration: 1.5, difficulty: Difficulty.easy },
      { from: 1, to: 2, distance: 2.5, ascent: 320, descent: 160, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 3.0, ascent: 150, descent: 470, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 4, distance: 4.2, ascent: 200, descent: 560, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 4, to: 5, distance: 0.5, ascent: 20, descent: 20, duration: 0.3, difficulty: Difficulty.easy },
      { from: 4, to: 6, distance: 3.8, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 6, to: 7, distance: 5.0, ascent: 580, descent: 210, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 4, to: 8, distance: 3.5, ascent: 500, descent: 140, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 8, to: 7, distance: 3.0, ascent: 200, descent: 300, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 3, to: 9, distance: 4.5, ascent: 300, descent: 240, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 6, to: 9, distance: 3.2, ascent: 380, descent: 170, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 10, to: 1, distance: 3.0, ascent: 200, descent: 200, duration: 2.0, difficulty: Difficulty.easy },
    ],
  },
  {
    name: 'Berner Oberland',
    slug: 'berner-oberland',
    bounds: { minLat: 46.35, minLng: 7.60, maxLat: 46.75, maxLng: 8.30 },
    center: { lat: 46.55, lng: 7.95 },
    huts: [
      { name: 'Grindelwaldblick', altitude: 2346, lat: 46.5833, lng: 8.0500, capacity: 55, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Grindelwaldblick_on_Kleine_Scheidegg.jpg/1280px-Grindelwaldblick_on_Kleine_Scheidegg.jpg' },
      { name: 'Glecksteinhütte', altitude: 2317, lat: 46.6000, lng: 8.0667, capacity: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Glecksteinh%C3%BCtte.jpg' },
      { name: 'Schreckhornhütte', altitude: 2529, lat: 46.5833, lng: 8.0833, capacity: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Schreckhornh%C3%BCtte.jpg' },
      { name: 'Lauteraarenhütte', altitude: 2392, lat: 46.5750, lng: 8.1083, capacity: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Lauteraarh%C3%BCtte.jpg' },
      { name: 'Dossenhütte', altitude: 2663, lat: 46.6500, lng: 8.1500, capacity: 48, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Dossenhuette.jpg' },
      { name: 'Gaulihütte', altitude: 2205, lat: 46.6333, lng: 8.1667, capacity: 52, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Gaulih%C3%BCtte.jpg' },
      { name: 'Bächlitalhütte', altitude: 2328, lat: 46.6167, lng: 8.2000, capacity: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/B%C3%A4chlitalh%C3%BCtte.jpg' },
      { name: 'Oberaarjochhütte', altitude: 3256, lat: 46.5417, lng: 8.2333, capacity: 46, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Oberaarjochh%C3%BCtte.jpg' },
      { name: 'Finsteraarhornhütte', altitude: 3048, lat: 46.5583, lng: 8.1333, capacity: 38, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Finsteraarhornh%C3%BCtte.jpg' },
      { name: 'Konkordiahütte', altitude: 2850, lat: 46.5500, lng: 8.0333, capacity: 110, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Konkordiah%C3%BCtte.jpg' },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.0, ascent: 220, descent: 250, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 1, to: 2, distance: 4.5, ascent: 450, descent: 240, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 3.8, ascent: 200, descent: 340, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 3, to: 8, distance: 5.0, ascent: 780, descent: 120, duration: 5.0, difficulty: Difficulty.difficult },
      { from: 8, to: 9, distance: 4.5, ascent: 200, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 9, to: 0, distance: 6.0, ascent: 150, descent: 650, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 7, distance: 6.5, ascent: 950, descent: 80, duration: 6.0, difficulty: Difficulty.difficult },
      { from: 7, to: 6, distance: 5.0, ascent: 100, descent: 1030, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 6, to: 5, distance: 3.5, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.easy },
      { from: 5, to: 4, distance: 4.0, ascent: 550, descent: 90, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 4, to: 1, distance: 5.5, ascent: 200, descent: 550, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 8, to: 7, distance: 4.2, ascent: 350, descent: 140, duration: 3.5, difficulty: Difficulty.difficult },
    ],
  },
]

async function main() {
  // Clear existing data
  await prisma.route.deleteMany()
  await prisma.roomTypeConfig.deleteMany()
  await prisma.hut.deleteMany()
  await prisma.region.deleteMany()

  for (const region of regions) {
    const dbRegion = await prisma.region.create({
      data: {
        name: region.name,
        slug: region.slug,
        boundingBoxMinLat: region.bounds.minLat,
        boundingBoxMinLng: region.bounds.minLng,
        boundingBoxMaxLat: region.bounds.maxLat,
        boundingBoxMaxLng: region.bounds.maxLng,
        centerLat: region.center.lat,
        centerLng: region.center.lng,
      },
    })

    const huts = []
    for (const h of region.huts) {
      const hut = await prisma.hut.create({
        data: {
          name: h.name,
          altitude: h.altitude,
          lat: h.lat,
          lng: h.lng,
          capacity: h.capacity,
          imageUrl: h.imageUrl || null,
          regionId: dbRegion.id,
          bookingSystem: BookingSystem.alpsonline,
          bookingUrl: '',
          amenities: ['Warmwasser', 'Strom'],
        },
      })
      huts.push(hut)

      await prisma.roomTypeConfig.createMany({
        data: [
          { hutId: hut.id, type: RoomType.double, count: Math.max(2, Math.floor(h.capacity * 0.15)) },
          { hutId: hut.id, type: RoomType.shared_4, count: Math.max(2, Math.floor(h.capacity * 0.2)) },
          { hutId: hut.id, type: RoomType.dorm, count: Math.max(4, Math.floor(h.capacity * 0.5)) },
        ],
      })
    }

    for (const r of region.routes) {
      await prisma.route.create({
        data: {
          fromHutId: huts[r.from].id,
          toHutId: huts[r.to].id,
          distance: r.distance,
          ascent: r.ascent,
          descent: r.descent,
          estimatedDuration: r.duration,
          difficulty: r.difficulty,
        },
      })
      await prisma.route.create({
        data: {
          fromHutId: huts[r.to].id,
          toHutId: huts[r.from].id,
          distance: r.distance,
          ascent: r.descent,
          descent: r.ascent,
          estimatedDuration: r.duration,
          difficulty: r.difficulty,
        },
      })
    }

    console.log(`  ✓ ${region.name}: ${huts.length} huts, ${region.routes.length * 2} routes`)
  }

  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  const totalRoutes = regions.reduce((s, r) => s + r.routes.length * 2, 0)
  console.log(`\n🌱 Seeded ${regions.length} regions, ${totalHuts} huts, ${totalRoutes} routes`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
