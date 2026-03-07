# Website-Rahmen für Hüttentour-Planer

## Ziel
Die bestehende Tool-App bekommt einen professionellen Website-Rahmen: persistenter Header mit Logo, Landing Page mit Hero + "So funktioniert's" + FAQ, und Footer.

## Entscheidungen
- **Landing Page + Karte**: Neue Landing Page, Karte wird ein Abschnitt
- **Sektionen**: Hero, "So funktioniert's" (3 Schritte), Karte, FAQ (Accordion)
- **FAQ**: Direkt auf der Startseite (kein separates Routing)
- **Header**: Überall sichtbar (persistenter Header auf allen Seiten)

## Architektur

### Header (Shared Component)
- Sticky, halbtransparent mit Blur-Backdrop
- Links: Logo (PNG) + "Hüttentour Planer"
- Rechts: Anker-Links "So funktioniert's", "FAQ", CTA "Tour planen"
- Mobil: Hamburger-Menü
- Im Root Layout (`layout.tsx`) eingebunden

### Landing Page (`/`)
1. **Hero**: Logo groß, Headline, Subtext, CTA-Button
2. **So funktioniert's**: 3 Schritt-Karten (Region → Konfigurieren → Verfügbarkeit)
3. **Karte**: Bestehende AlpineMap eingebettet (~70vh)
4. **FAQ**: Accordion mit typischen Fragen
5. **Footer**: Logo, Copyright, Links

### Bestehende Seiten
- `/tour/configure`, `/tour/results`, `/tour/availability` bleiben unverändert
- Bekommen automatisch den Header durch Root Layout

## Technik
- Tailwind CSS (bereits vorhanden)
- Keine neuen Dependencies
- Logo: `huttentour-planer-logo.png` → `public/` verschieben
