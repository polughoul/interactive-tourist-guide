# Projekt TravelGuide

## Přehled projektu

**TravelGuide** je interaktivní webová aplikace sloužící jako turistický průvodce. Umožňuje uživatelům:

- Prohlížet si průvodce po městech
- Zobrazovat multimediální obsah (video a audio průvodce)
- Prozkoumávat interaktivní mapy s geolokací
- Získávat lokální doporučení (např. kavárny, muzea)

Součástí je také administrační rozhraní pro úpravu obsahu, přístupné pouze administrátorům.

Projekt klade důraz na plynulý uživatelský zážitek díky funkcím jako:

- Animované slidery
- Přepínání mezi světlým a tmavým režimem
- Tlačítko pro návrat na začátek stránky (scroll-to-top)
- Offline přístupnost pomocí localStorage a kontroly dostupnosti internetu

---

## Struktura projektu

### Složky a soubory

- **`templates/`** – HTML šablony (`index.html`, `route_detail.html`, `admin.html`)
- **`css/`** – Stylovací soubory (`styles.css`, `admin.css`, `route_details.css`)
- **`js/`** – Hlavní logika aplikace (`main.js`, `route.js`, `vue-app.js`, `auth.js`, `new_app.js`)
- **`js/components/`** – Vue komponenty (`edit_modal.js`, `favorite_modal.js`)
- **`js/utils/`** – Pomocné moduly (`slider.js`, `scroll_to_top.js`, `weather_widget.js`, `theme.js`, `media_control.js`)
- **`js/vue/`** – Externí knihovny (`vue.global.js`)

---

## Vývoj

- Aplikace využívá moderní JavaScript (ES6+) a framework **Vue 3** pro reaktivní rozhraní.
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

- Projekt je nutné spouštět na HTTP serveru (např. Live Server ve VS Code) kvůli správnému fungování API.
- Důležité knihovny (např. Vue) jsou uloženy lokálně – pro offline přístup a nezávislost na CDN.
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
- Video/audio průvodce (YouTube nebo lokální)
- Widget počasí a doporučení v okolí
- Galerie obrázků (slider)
- Upozornění při nedostupnosti funkcí (např. offline režim)

### Offline režim

- Funkce `checkInternetConnection()` ověřuje připojení přes `fetch`
- Při nedostupnosti internetu se zobrazí zprávy místo:
  - Videa, audia, mapy, počasí, doporučení
- Data jako průvodci a oblíbené položky jsou uložena v `localStorage`

### Administrace a editace

- Stránka `admin.html` umožňuje přihlášení a úpravy obsahu
- Editace probíhá pomocí Vue modálních oken
- Úpravy se ukládají do `localStorage`

### Uživatelské zlepšení

- Přepínání světlého/tmavého režimu (ukládá se do `localStorage`)
- Tlačítko pro návrat na začátek, hover efekty a animace
- Geolokace umožňuje zobrazit blízké průvodce a zajímavosti

---

## Licence

Projekt je dostupný pod licencí [MIT License](LICENSE) – volné použití, úpravy a distribuce s uvedením autora.

---

## Autor

Vytvořeno jako součást projektu **TravelGuide** pro účely výuky a demonstrace možností moderního webového vývoje.
