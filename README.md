# Projekt TravelGuide

## Přehled projektu

**TravelGuide** je interaktivní webová aplikace sloužící jako turistický průvodce. Umožňuje uživatelům:

- Prohlížet si průvodce po městech
- Zobrazovat multimediální obsah (video a audio průvodce)
- Prozkoumávat mapy
- Vyhledat nejbližší průvodce pomocí geolokace. 
- Získávat lokální doporučení (kavárny, muzea)

Součástí je taky:
- Animované slidery
- Přepínání mezi světlým a tmavým režimem
- Tlačítko pro návrat na začátek stránky (scroll-to-top)
- Offline přístupnost pomocí localStorage a kontroly dostupnosti internetu
- Administrační rozhraní pro úpravu obsahu, přístupné pouze administrátorům.

---

## Struktura projektu

### Složky a soubory

- **`/`** – HTML šablony (`index.html`, `route_detail.html`, `admin.html`)
- **`css/`** – Stylovací soubory (`styles.css`, `admin.css`, `route_details.css`)
- **`js/`** – Hlavní logika aplikace (`main.js`, `route.js`, `vue-app.js`, `auth.js`, `new_app.js`)
- **`js/components/`** – Vue komponenty (`edit_modal.js`, `favorite_modal.js`)
- **`js/utils/`** – Pomocné moduly (`slider.js`, `scroll_to_top.js`, `weather_widget.js`, `theme.js`, `media_control.js`)
- **`js/vue/`** – Externa knihovna (`vue.global.js`)

---

## Vývoj

- Aplikace využívá moderní JavaScript a framework **Vue 3** pro reaktivní rozhraní.(Vue je použivana jako knihovna)
- Data průvodců jsou modelována objektově a ukládána do `localStorage`, což zajišťuje funkčnost i offline.
- Administrace zahrnuje přihlašování a editaci pomocí Vue modálů.
- Interaktivní mapa využívá **Leaflet**, multimediální obsah se načítá pouze při dostupnosti internetu.
- Další funkce:
  - Posuvný slider s využitím `requestAnimationFrame`
  - Přepínání témat (tmavý/světlý režim)
  - Scroll-to-top
  - Geolokace a externí API pro doporučení

Offline režim je řešen kontrolou připojení pomocí `fetch` na CORS-povolené API a zobrazováním srozumitelných upozornění.

---

## Nasazení a testování

- Projekt lze spustit na HTTP serveru (např. Live Server ve VS Code) nebo otevřit pomoci github pages
- vue.global.js je uložen lokálně – pro offline přístup.
- Testuje se responzivita, kompatibilita napříč prohlížeči a celková použitelnost pomocí moderních CSS technik (včetně vendor prefixů).

---

## Funkce

### Hlavní rozhraní (`index.html`)

- Navigace, úvodní banner a karty průvodců (generováno pomocí `vue-app.js`)
- Karty obsahují:
  - Obrázek, název, popis, hodnocení, délku
  - Tlačítka pro detail, přidání do oblíbených, úpravu (pro admina)

### Detail průvodce (`route_detail.html`)

- Interaktivní mapa (Leaflet)
- Video průvodce (YouTube)
- Audio průvodce (lokální)
- Widget počasí a doporučení v okolí
- Galerie obrázků (slider)
- Upozornění při nedostupnosti funkcí (offline režim)

### Offline režim

- Funkce `checkInternetConnection()` ověřuje připojení přes `fetch`
- Při nedostupnosti internetu se zobrazí zprávy místo:
  - Videa, mapy, počasí, doporučení
- Data jako průvodci, audio, oblíbené položky atd. jsou uložena v `localStorage`

### Administrace a editace

- Stránka `admin.html` umožňuje přihlášení a úpravy obsahu
- Editace probíhá pomocí Vue modálních oken
- Úpravy se ukládají do `localStorage`

### Uživatelské zlepšení

- Přepínání světlého/tmavého režimu (ukládá se do `localStorage`)
- Tlačítko pro návrat na začátek, hover efekty a animace
- Geolokace umožňuje zobrazit blízké průvodce a zajímavosti
- Navigační historie a hladké posouvání(stránka plynule posouvá k příslušné sekci a zároveň se aktuální stav URL aktualizuje bez nutnosti obnovení stránky.)

---
