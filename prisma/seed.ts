import { config } from 'dotenv'
config()
import { PrismaClient, BookingSystem, Difficulty, RoomType, AccessPointType } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

interface AccessPointSeed {
  name: string
  type: AccessPointType
  altitude: number
  lat: number
  lng: number
  cableCar?: { operatorName: string; seasonStart?: string; seasonEnd?: string; website?: string }
  routes: { hutIndex: number; distance: number; ascent: number; descent: number; duration: number; difficulty: Difficulty; hasCableCar?: boolean }[]
}

interface RegionSeed {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: { name: string; altitude: number; lat: number; lng: number; capacity: number; imageUrl?: string; seasonStart?: string; seasonEnd?: string; bookingUrl?: string }[]
  routes: { from: number; to: number; distance: number; ascent: number; descent: number; duration: number; difficulty: Difficulty; gpxTrack?: [number, number][] }[]
  accessPoints: AccessPointSeed[]
}

const regions: RegionSeed[] = [
  {
    name: 'Stubaier Alpen',
    slug: 'stubaier-alpen',
    bounds: { minLat: 46.95, minLng: 11.05, maxLat: 47.15, maxLng: 11.45 },
    center: { lat: 47.05, lng: 11.25 },
    huts: [
      { name: 'Innsbrucker Hütte', altitude: 2369, lat: 47.0578, lng: 11.4103, capacity: 80, seasonStart: '06-15', seasonEnd: '10-01', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/320/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Innsbrucker_Huette.jpg' },
      { name: 'Bremer Hütte', altitude: 2411, lat: 47.0403, lng: 11.4267, capacity: 60, seasonStart: '06-20', seasonEnd: '10-01', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/143/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Terrasse_der_Bremer_H%C3%BCtte.jpg/1280px-Terrasse_der_Bremer_H%C3%BCtte.jpg' },
      { name: 'Nürnberger Hütte', altitude: 2280, lat: 47.0233, lng: 11.4456, capacity: 100, seasonStart: '06-20', seasonEnd: '09-30', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/124/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/N%C3%BCrnberger_H%C3%BCtte_2017.jpg' },
      { name: 'Sulzenau Hütte', altitude: 2191, lat: 47.0311, lng: 11.3889, capacity: 90, seasonStart: '06-15', seasonEnd: '09-30', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/648/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/14.Sulzenau-Ost.jpg/1280px-14.Sulzenau-Ost.jpg' },
      { name: 'Dresdner Hütte', altitude: 2308, lat: 46.9981, lng: 11.1395, capacity: 120, bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/692/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Dresdner_H%C3%BCtte1.JPG' },
      { name: 'Neue Regensburger Hütte', altitude: 2286, lat: 47.0456, lng: 11.3667, capacity: 70, seasonStart: '06-20', seasonEnd: '09-30', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/275/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Neue_Regensburger_Huette_%28Terassenansicht%29.jpg' },
      { name: 'Franz-Senn-Hütte', altitude: 2147, lat: 47.0833, lng: 11.3167, capacity: 150, seasonStart: '06-01', seasonEnd: '10-05', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/675/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/FranzSennHuette.jpg' },
      { name: 'Starkenburger Hütte', altitude: 2237, lat: 47.0889, lng: 11.3000, capacity: 60, seasonStart: '06-15', seasonEnd: '10-05', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/693/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/StarkenburgerHuette.jpg' },
      { name: 'Elferhütte', altitude: 2080, lat: 47.0944, lng: 11.3222, capacity: 40, seasonStart: '06-15', seasonEnd: '10-05', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/ElferH-SW.jpg' },
      { name: 'Mannheimer Hütte (Stubai)', altitude: 2007, lat: 47.0622, lng: 11.2833, capacity: 50, seasonStart: '06-15', seasonEnd: '09-30', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/A-V_-_Mannheimer_H%C3%BCtte.jpg' },
      { name: 'Hildesheimer Hütte', altitude: 2899, lat: 46.9989, lng: 11.3833, capacity: 56, seasonStart: '06-25', seasonEnd: '09-25', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Hildesheimer_H%C3%BCtte_%284858307114%29.jpg' },
      { name: 'Siegerlandhütte', altitude: 2710, lat: 46.9911, lng: 11.4000, capacity: 48, seasonStart: '06-25', seasonEnd: '09-30', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Siegerlandh%C3%BCtte.jpg' },
      { name: 'Amberger Hütte', altitude: 2135, lat: 47.0144, lng: 11.2667, capacity: 72, seasonStart: '06-15', seasonEnd: '09-30', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Exkursion_zur_Amberger_H%C3%BCtte_14.jpg' },
      { name: 'Westfalenhaus', altitude: 2273, lat: 47.0267, lng: 11.2500, capacity: 54, seasonStart: '06-20', seasonEnd: '09-30', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/WestfalenhausSommer.jpg' },
      { name: 'Pforzheimer Hütte', altitude: 2308, lat: 47.0378, lng: 11.2833, capacity: 45, seasonStart: '06-20', seasonEnd: '09-30', bookingUrl: 'https://www.hut-reservation.org/reservation/book-hut/239/wizard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Pforzheimer_H%C3%BCtte.jpg' },
    ],
    routes: [
      // Innsbrucker Hütte → Bremer Hütte via Simmingjöchl
      { from: 0, to: 1, distance: 5.2, ascent: 450, descent: 400, duration: 3.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.4103,47.0578],[11.4130,47.0545],[11.4155,47.0510],[11.4175,47.0480],[11.4200,47.0460],[11.4230,47.0435],[11.4267,47.0403]] },
      // Bremer Hütte → Nürnberger Hütte via Ölgrubenkar
      { from: 1, to: 2, distance: 6.8, ascent: 380, descent: 510, duration: 4.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.4267,47.0403],[11.4275,47.0370],[11.4300,47.0340],[11.4330,47.0310],[11.4365,47.0285],[11.4400,47.0260],[11.4430,47.0245],[11.4456,47.0233]] },
      // Nürnberger Hütte → Sulzenau Hütte through upper Sulzenautal
      { from: 2, to: 3, distance: 4.5, ascent: 320, descent: 410, duration: 3.0, difficulty: Difficulty.easy,
        gpxTrack: [[11.4456,47.0233],[11.4380,47.0240],[11.4270,47.0255],[11.4150,47.0270],[11.4040,47.0288],[11.3960,47.0300],[11.3889,47.0311]] },
      // Sulzenau Hütte → Neue Regensburger Hütte via Grünausee
      { from: 3, to: 5, distance: 5.0, ascent: 480, descent: 380, duration: 3.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.3889,47.0311],[11.3865,47.0335],[11.3840,47.0355],[11.3810,47.0380],[11.3775,47.0400],[11.3740,47.0420],[11.3700,47.0440],[11.3667,47.0456]] },
      // Neue Regensburger Hütte → Franz-Senn-Hütte via Schrimmennieder
      { from: 5, to: 6, distance: 7.2, ascent: 350, descent: 490, duration: 4.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.3667,47.0456],[11.3640,47.0490],[11.3590,47.0530],[11.3530,47.0570],[11.3460,47.0620],[11.3380,47.0680],[11.3300,47.0740],[11.3230,47.0790],[11.3167,47.0833]] },
      // Franz-Senn-Hütte → Starkenburger Hütte via Seducker Hochalm
      { from: 6, to: 7, distance: 3.8, ascent: 290, descent: 200, duration: 2.5, difficulty: Difficulty.easy,
        gpxTrack: [[11.3167,47.0833],[11.3120,47.0845],[11.3080,47.0855],[11.3040,47.0868],[11.3000,47.0889]] },
      // Starkenburger Hütte → Elferhütte via Hoher Burgstall ridge
      { from: 7, to: 8, distance: 2.5, ascent: 150, descent: 310, duration: 1.5, difficulty: Difficulty.easy,
        gpxTrack: [[11.3000,47.0889],[11.3045,47.0900],[11.3090,47.0915],[11.3140,47.0928],[11.3180,47.0938],[11.3222,47.0944]] },
      // Franz-Senn-Hütte → Mannheimer Hütte via Rinnensee
      { from: 6, to: 9, distance: 6.0, ascent: 420, descent: 560, duration: 4.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.3167,47.0833],[11.3130,47.0810],[11.3080,47.0780],[11.3020,47.0745],[11.2960,47.0710],[11.2910,47.0675],[11.2870,47.0650],[11.2833,47.0622]] },
      // Sulzenau Hütte → Dresdner Hütte via Peiljoch
      { from: 3, to: 4, distance: 5.5, ascent: 520, descent: 400, duration: 4.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.3889,47.0311],[11.3860,47.0285],[11.3820,47.0255],[11.3770,47.0220],[11.3715,47.0185],[11.3650,47.0145],[11.3580,47.0105],[11.3500,47.0067]] },
      // Dresdner Hütte → Hildesheimer Hütte via Fernaukar (steep, glacier)
      { from: 4, to: 10, distance: 4.2, ascent: 680, descent: 90, duration: 3.5, difficulty: Difficulty.difficult,
        gpxTrack: [[11.3500,47.0067],[11.3550,47.0055],[11.3610,47.0040],[11.3680,47.0025],[11.3750,47.0010],[11.3833,46.9989]] },
      // Hildesheimer Hütte → Siegerlandhütte along high ridge
      { from: 10, to: 11, distance: 3.5, ascent: 200, descent: 390, duration: 2.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.3833,46.9989],[11.3870,46.9975],[11.3910,46.9955],[11.3950,46.9935],[11.4000,46.9911]] },
      // Siegerlandhütte → Nürnberger Hütte via Gamsfallkar
      { from: 11, to: 2, distance: 6.0, ascent: 350, descent: 780, duration: 4.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.4000,46.9911],[11.4030,46.9945],[11.4080,46.9990],[11.4140,47.0045],[11.4210,47.0100],[11.4290,47.0145],[11.4370,47.0190],[11.4456,47.0233]] },
      // Mannheimer Hütte → Amberger Hütte via Sulztal
      { from: 9, to: 12, distance: 5.8, ascent: 380, descent: 250, duration: 3.5, difficulty: Difficulty.moderate,
        gpxTrack: [[11.2833,47.0622],[11.2820,47.0570],[11.2800,47.0510],[11.2775,47.0440],[11.2745,47.0370],[11.2720,47.0290],[11.2695,47.0220],[11.2667,47.0144]] },
      // Amberger Hütte → Westfalenhaus via Sulztal head
      { from: 12, to: 13, distance: 4.0, ascent: 340, descent: 200, duration: 3.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.2667,47.0144],[11.2640,47.0168],[11.2610,47.0195],[11.2570,47.0220],[11.2535,47.0245],[11.2500,47.0267]] },
      // Westfalenhaus → Pforzheimer Hütte via Lüsener Ferner
      { from: 13, to: 14, distance: 3.5, ascent: 280, descent: 250, duration: 2.5, difficulty: Difficulty.easy,
        gpxTrack: [[11.2500,47.0267],[11.2555,47.0290],[11.2620,47.0315],[11.2700,47.0340],[11.2770,47.0360],[11.2833,47.0378]] },
      // Pforzheimer Hütte → Neue Regensburger Hütte via Hohe Villerspitze
      { from: 14, to: 5, distance: 4.8, ascent: 350, descent: 370, duration: 3.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.2833,47.0378],[11.2920,47.0390],[11.3040,47.0400],[11.3160,47.0415],[11.3290,47.0428],[11.3420,47.0438],[11.3540,47.0448],[11.3667,47.0456]] },
      // Innsbrucker Hütte → Neue Regensburger Hütte (long traverse via Brunnenkogel)
      { from: 0, to: 5, distance: 7.0, ascent: 520, descent: 600, duration: 5.0, difficulty: Difficulty.moderate,
        gpxTrack: [[11.4103,47.0578],[11.4040,47.0560],[11.3970,47.0540],[11.3900,47.0515],[11.3830,47.0495],[11.3760,47.0480],[11.3700,47.0468],[11.3667,47.0456]] },
      // Elferhütte → Franz-Senn-Hütte direct via Pinnistal
      { from: 8, to: 6, distance: 2.5, ascent: 310, descent: 150, duration: 2.0, difficulty: Difficulty.easy,
        gpxTrack: [[11.3222,47.0944],[11.3210,47.0920],[11.3200,47.0895],[11.3190,47.0870],[11.3180,47.0850],[11.3167,47.0833]] },
    ],
    accessPoints: [
      {
        name: 'Neustift/Stubaital',
        type: AccessPointType.village,
        altitude: 993, lat: 47.1111, lng: 11.3108,
        routes: [
          { hutIndex: 6, distance: 8.5, ascent: 1150, descent: 0, duration: 4.0, difficulty: Difficulty.moderate },
          { hutIndex: 7, distance: 6.0, ascent: 1240, descent: 0, duration: 4.5, difficulty: Difficulty.moderate },
          { hutIndex: 8, distance: 4.5, ascent: 1080, descent: 0, duration: 3.5, difficulty: Difficulty.moderate },
        ],
      },
      {
        name: 'Elferlifte Talstation',
        type: AccessPointType.cable_car,
        altitude: 1000, lat: 47.1083, lng: 11.3144,
        cableCar: { operatorName: 'Elferbahnen Neustift', seasonStart: '06-15', seasonEnd: '10-15', website: 'https://www.elfer.at' },
        routes: [
          { hutIndex: 8, distance: 1.5, ascent: 200, descent: 0, duration: 0.5, difficulty: Difficulty.easy, hasCableCar: true },
        ],
      },
      {
        name: 'Mutterberg/Stubaier Gletscher',
        type: AccessPointType.parking,
        altitude: 1750, lat: 47.0028, lng: 11.3472,
        routes: [
          { hutIndex: 4, distance: 3.0, ascent: 560, descent: 0, duration: 2.0, difficulty: Difficulty.easy },
        ],
      },
      {
        name: 'Ranalt/Stubaital',
        type: AccessPointType.parking,
        altitude: 1300, lat: 47.0539, lng: 11.3428,
        routes: [
          { hutIndex: 3, distance: 5.0, ascent: 890, descent: 0, duration: 3.5, difficulty: Difficulty.moderate },
          { hutIndex: 5, distance: 6.5, ascent: 990, descent: 0, duration: 4.0, difficulty: Difficulty.moderate },
        ],
      },
      {
        name: 'Grawaalm/Sulzenaualm',
        type: AccessPointType.parking,
        altitude: 1530, lat: 47.0417, lng: 11.3611,
        routes: [
          { hutIndex: 3, distance: 3.5, ascent: 660, descent: 0, duration: 2.5, difficulty: Difficulty.easy },
          { hutIndex: 2, distance: 5.0, ascent: 750, descent: 0, duration: 3.5, difficulty: Difficulty.moderate },
        ],
      },
      {
        name: 'Seduck/Gschnitztal',
        type: AccessPointType.parking,
        altitude: 1480, lat: 47.0456, lng: 11.4222,
        routes: [
          { hutIndex: 0, distance: 4.5, ascent: 890, descent: 0, duration: 3.0, difficulty: Difficulty.moderate },
          { hutIndex: 1, distance: 5.0, ascent: 930, descent: 0, duration: 3.5, difficulty: Difficulty.moderate },
        ],
      },
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
    accessPoints: [
      {
        name: 'Mayrhofen',
        type: AccessPointType.village,
        altitude: 630, lat: 47.1589, lng: 11.8614,
        routes: [
          { hutIndex: 9, distance: 6.0, ascent: 1290, descent: 0, duration: 4.5, difficulty: Difficulty.moderate },
          { hutIndex: 6, distance: 8.0, ascent: 1610, descent: 0, duration: 5.5, difficulty: Difficulty.difficult },
          { hutIndex: 7, distance: 7.5, ascent: 1610, descent: 0, duration: 5.5, difficulty: Difficulty.difficult },
        ],
      },
      {
        name: 'Breitlahner',
        type: AccessPointType.parking,
        altitude: 1256, lat: 47.0500, lng: 11.7375,
        routes: [
          { hutIndex: 3, distance: 7.0, ascent: 790, descent: 0, duration: 3.5, difficulty: Difficulty.moderate },
          { hutIndex: 10, distance: 4.0, ascent: 550, descent: 0, duration: 2.5, difficulty: Difficulty.easy },
        ],
      },
      {
        name: 'Schlegeisspeicher',
        type: AccessPointType.parking,
        altitude: 1782, lat: 47.0283, lng: 11.7028,
        routes: [
          { hutIndex: 0, distance: 3.5, ascent: 610, descent: 0, duration: 2.5, difficulty: Difficulty.moderate },
          { hutIndex: 1, distance: 4.0, ascent: 720, descent: 0, duration: 3.0, difficulty: Difficulty.moderate },
          { hutIndex: 10, distance: 1.5, ascent: 25, descent: 0, duration: 0.5, difficulty: Difficulty.easy },
        ],
      },
      {
        name: 'Ginzling',
        type: AccessPointType.village,
        altitude: 985, lat: 47.0833, lng: 11.7833,
        routes: [
          { hutIndex: 3, distance: 6.5, ascent: 1060, descent: 0, duration: 4.0, difficulty: Difficulty.moderate },
          { hutIndex: 4, distance: 7.0, ascent: 1240, descent: 0, duration: 5.0, difficulty: Difficulty.moderate },
          { hutIndex: 5, distance: 7.5, ascent: 1190, descent: 0, duration: 5.0, difficulty: Difficulty.moderate },
        ],
      },
    ],
  },
]

async function main() {
  // Clear existing data
  await prisma.accessRoute.deleteMany()
  await prisma.cableCar.deleteMany()
  await prisma.accessPoint.deleteMany()
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
          bookingUrl: h.bookingUrl || '',
          seasonStart: h.seasonStart || null,
          seasonEnd: h.seasonEnd || null,
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
          gpxTrack: r.gpxTrack || undefined,
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
          gpxTrack: r.gpxTrack ? [...r.gpxTrack].reverse() : undefined,
        },
      })
    }

    // Create access points and access routes
    let apCount = 0
    let arCount = 0
    for (const ap of region.accessPoints) {
      const dbAP = await prisma.accessPoint.create({
        data: {
          name: ap.name,
          type: ap.type,
          altitude: ap.altitude,
          lat: ap.lat,
          lng: ap.lng,
          regionId: dbRegion.id,
        },
      })
      apCount++

      if (ap.cableCar) {
        await prisma.cableCar.create({
          data: {
            accessPointId: dbAP.id,
            operatorName: ap.cableCar.operatorName,
            seasonStart: ap.cableCar.seasonStart,
            seasonEnd: ap.cableCar.seasonEnd,
            website: ap.cableCar.website,
          },
        })
      }

      for (const ar of ap.routes) {
        await prisma.accessRoute.create({
          data: {
            accessPointId: dbAP.id,
            hutId: huts[ar.hutIndex].id,
            distance: ar.distance,
            ascent: ar.ascent,
            descent: ar.descent,
            estimatedDuration: ar.duration,
            difficulty: ar.difficulty,
            hasCableCar: ar.hasCableCar || false,
          },
        })
        arCount++
      }
    }

    console.log(`  ✓ ${region.name}: ${huts.length} huts, ${region.routes.length * 2} routes, ${apCount} access points, ${arCount} access routes`)
  }

  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  const totalRoutes = regions.reduce((s, r) => s + r.routes.length * 2, 0)
  console.log(`\n🌱 Seeded ${regions.length} regions, ${totalHuts} huts, ${totalRoutes} routes`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
