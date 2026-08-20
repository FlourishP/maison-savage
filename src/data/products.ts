import type { AnimalPrintType, Product, Slide } from "./types";

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const textureMacro: Record<AnimalPrintType, string> = {
  cheetah: "/textures/cheetah-macro.svg",
  leopard: "/textures/leopard-macro.svg",
  python: "/textures/python-macro.svg",
  zebra: "/textures/zebra-macro.svg",
  jaguar: "/textures/jaguar-macro.svg",
  none: "",
};

const macroCrop = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&h=1750&crop=entropy&q=80`;

const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const shoeSizes = ["36", "37", "38", "39", "40", "41", "42"];
const oneSize = ["One Size"];

export const CATEGORIES = [
  "All",
  "Women's Runway",
  "Men's Tailoring",
  "Handbags & Shoes",
  "Intimates & Lingerie",
  "High Jewelry",
  "Everyday Essentials",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "savanna-gown",
    title: "Savanna Drape Gown",
    category: "Women's Runway",
    price: 12400,
    image: unsplash("1539109136881-3be0616acf4b"),
    hoverImage: textureMacro.cheetah,
    animalPrintType: "cheetah",
    material: "Champagne silk charmeuse with hand-painted cheetah rosettes",
    description:
      "A floor-length column gown cut from liquid silk charmeuse. Hand-painted cheetah rosettes cascade from the shoulder in an asymmetric drape that catches light with every step.",
    sizes: apparelSizes,
    details: [
      "Hand-painted animal-motif in atelier silk paint",
      "Bias-cut skirt with 240 cm train",
      "Lined with cupro; hidden bust construction",
      "Made to order in 6 weeks",
    ],
    featured: true,
  },
  {
    id: "opaline-dress",
    title: "Opaline Silk Cocktail Dress",
    category: "Women's Runway",
    price: 6800,
    image: unsplash("1515886657613-9f3515b0c78f"),
    hoverImage: textureMacro.leopard,
    animalPrintType: "leopard",
    material: "Leopard-print jacquard silk taffeta",
    description:
      "A sculptural cocktail dress in deep-toned leopard jacquard silk taffeta, cinched at the waist with an internal corset and finished with a knife-pleated hem.",
    sizes: apparelSizes,
    details: [
      "Architectural jacquard weave, 32,000 threads per metre",
      "Removable shoulder capelet",
      "Concealed gold-tone zip fastening",
      "Dry clean only",
    ],
  },
  {
    id: "obsidian-velvet",
    title: "Obsidian Velvet Evening Gown",
    category: "Women's Runway",
    price: 9800,
    image: unsplash("1509631179647-0177331693ae"),
    hoverImage: textureMacro.zebra,
    animalPrintType: "zebra",
    material: "Zebra-toned crushed velvet",
    description:
      "Midnight velvet devoré gown with a zebra-stripe burnout revealing champagne silk beneath. A column of slow, deliberate drama for the red carpet.",
    sizes: apparelSizes,
    details: [
      "Devoré zebra burnout on 100% silk velvet",
      "Draped cowl neckline, open back",
      "Fully silk lined",
      "Made with 40 recycled bottles per gown",
    ],
    featured: true,
  },
  {
    id: "amber-slip",
    title: "Amber Slip Dress",
    category: "Women's Runway",
    price: 5200,
    image: unsplash("1483985988355-763728e1935b"),
    hoverImage: textureMacro.python,
    animalPrintType: "python",
    material: "Python-embossed satin",
    description:
      "An effortless bias-cut slip in python-embossed amber satin. The print is pressed by machine, then hand-rubbed with gold pigment so it shimmers when you move.",
    sizes: apparelSizes,
    details: [
      "Hand-rubbed gold pigment on python emboss",
      "Adjustable gold chain straps",
      "Satin underlining",
      "Also available in rose, jet, and espresso",
    ],
  },
  {
    id: "cinder-suit",
    title: "Cinder Jacquard Suit",
    category: "Men's Tailoring",
    price: 8650,
    image: unsplash("1617137968427-85924c800a22"),
    hoverImage: textureMacro.leopard,
    animalPrintType: "leopard",
    material: "Leopard jacquard virgin wool",
    description:
      "A two-button suit in leopard-pattern jacquard wool, softly structured with roped shoulders. Tailored in the Maison's Roman shoulder block with fully functioning cuffs.",
    sizes: apparelSizes,
    details: [
      "Leopard jacquard, 320 gsm virgin wool",
      "Half-canvas construction, hand-stitched lapels",
      "20+ hours of atelier time per suit",
      "Trousers incl. flat front with 2 cm cuff",
    ],
    featured: true,
  },
  {
    id: "patron-tuxedo",
    title: "Patron Peak-Lapel Tuxedo",
    category: "Men's Tailoring",
    price: 9200,
    image: unsplash("1519085360753-af0119f7cbe7"),
    hoverImage: textureMacro.zebra,
    animalPrintType: "zebra",
    material: "Midnight barathea with silk satin lapels",
    description:
      "The definitive evening uniform. Midnight barathea wool with a zebra-stripe grosgrain trim and cream silk satin peak lapels. Cut long, sculpted, and severe.",
    sizes: apparelSizes,
    details: [
      "Hard-to-soft construction, natural shoulder",
      "Zebra-stripe grosgrain shawl option",
      "Single-button closure, double-vent back",
      "Includes matte silver cufflinks",
    ],
  },
  {
    id: "otter-blazer",
    title: "Otter Tailored Blazer",
    category: "Men's Tailoring",
    price: 4200,
    image: unsplash("1520975954732-35dd22299614"),
    hoverImage: textureMacro.cheetah,
    animalPrintType: "cheetah",
    material: "Etched cheetah-print wool twill",
    description:
      "A weekender's blazer in etched cheetah-print wool twill — confident by day, quiet luxury by night. Unstructured shoulders and a half-canvas front keep it light.",
    sizes: apparelSizes,
    details: [
      "Etched print in tonal gold on charcoal twill",
      "Patch pockets with hidden ticket pocket",
      "Horn buttons, leather trim at collar",
      "Sleeves with surgeon's cuff",
    ],
  },
  {
    id: "sable-overcoat",
    title: "Sable Overcoat",
    category: "Men's Tailoring",
    price: 7400,
    image: unsplash("1516822003754-cca485356ecb"),
    hoverImage: textureMacro.zebra,
    animalPrintType: "zebra",
    material: "Zebra herringbone cashmere",
    description:
      "A sweeping knee-length overcoat in zebra herringbone cashmere. The pattern reads black-and-cream from across the street and disappears into the texture up close.",
    sizes: apparelSizes,
    details: [
      "Double-faced 625 gsm cashmere",
      "Knee length, raglan sleeve",
      "Hidden throat latch and storm flap",
      "Dry clean only",
    ],
    featured: true,
  },
  {
    id: "panthere-bag",
    title: "La Panthère Bag",
    category: "Handbags & Shoes",
    price: 11500,
    image: unsplash("1584917865442-de89df76afd3"),
    hoverImage: textureMacro.cheetah,
    animalPrintType: "cheetah",
    material: "Cheetah-print calf leather, 18k gold hardware",
    description:
      "The house icon. A structured top-handle in cheetah-print calf leather, clasped by a sculpted panther head cast in 18k gold. Each bag requires 22 hours and one hide.",
    sizes: oneSize,
    details: [
      "Hand-carved panther clasp in 18k gold",
      "24k gold-plated feet and corners",
      "Interior pocket with mirror and key bell",
      "Each hide traced and numbered",
    ],
    featured: true,
  },
  {
    id: "serpent-boot",
    title: "Serpent Calfskin Boot",
    category: "Handbags & Shoes",
    price: 3900,
    image: unsplash("1610992015732-2449b76344bc"),
    hoverImage: textureMacro.python,
    animalPrintType: "python",
    material: "Genuine python calf blend, blade heel",
    description:
      "A knee-high boot in python-embossed calfskin over a 90 mm blade heel. The scales are printed to follow the natural flow of the leg and set on a crepe-riding sole.",
    sizes: shoeSizes,
    details: [
      "Python emboss on vegetable-tanned calf",
      "90 mm sculpted blade heel",
      "Side zip with gold-tone talon pull",
      "Hand-burnished toes",
    ],
    featured: true,
  },
  {
    id: "cobalt-heel",
    title: "Cobalt Blade Heel",
    category: "Handbags & Shoes",
    price: 2400,
    image: unsplash("1543163521-1bf539c55dd2"),
    hoverImage: textureMacro.python,
    animalPrintType: "python",
    material: "Python-print patent leather",
    description:
      "A sharp 110 mm pump in blue-black python-print patent leather with a lipstick-red leather sock. Made on the house last for a long, feline silhouette.",
    sizes: shoeSizes,
    details: [
      "110 mm stiletto with steel shank",
      "Full leather lining and outsole",
      "Made on the house 'Fauve' last",
      "Comes with talc pouch and dust bag",
    ],
  },
  {
    id: "noir-sneaker",
    title: "Noir Court Sneaker",
    category: "Handbags & Shoes",
    price: 1600,
    image: unsplash("1552346154-21d32810aba3"),
    hoverImage: macroCrop("1552346154-21d32810aba3"),
    animalPrintType: "none",
    material: "Matte calfskin with gold eyelets",
    description:
      "A court-shaped sneaker in matte black calfskin with 24k gold-filled eyelets and a herringbone rubber sole. Quiet luxury for the first-class lounge.",
    sizes: shoeSizes,
    details: [
      "Calfskin upper, goat lining",
      "24k gold-filled eyelets",
      "Removable comfort insole",
      "Made in limited runs of 200",
    ],
  },
  {
    id: "thistle-lace",
    title: "Thistle Lace Corset Set",
    category: "Intimates & Lingerie",
    price: 2800,
    image: unsplash("1487222477894-8943e31ef7b2"),
    hoverImage: textureMacro.leopard,
    animalPrintType: "leopard",
    material: "Leopard Chantilly lace and silk tulle",
    description:
      "A two-piece set of leopard Chantilly lace and ivory silk tulle. The corset is boned with flexible steel and laced with satin ribbon through gold grommets.",
    sizes: apparelSizes,
    details: [
      "Hand-appliquéd leopard Chantilly lace",
      "Flexible steel boning, 6-point corset",
      "Adjustable satin ribbon lacing",
      "Ships in a lacquered keepsake box",
    ],
    featured: true,
  },
  {
    id: "sable-nightdress",
    title: "Sable Silk Nightdress",
    category: "Intimates & Lingerie",
    price: 1950,
    image: unsplash("1544441893-675973e31985"),
    hoverImage: macroCrop("1544441893-675973e31985"),
    animalPrintType: "none",
    material: "22-momme washed silk",
    description:
      "A floor-length nightdress in 22-momme washed silk with a deep plunge neck and bias hem. Buttery, weightless, and edged with a whisper of gold picot.",
    sizes: apparelSizes,
    details: [
      "22-momme mulberry washed silk",
      "Bias cut for fluid drape",
      "Gold picot-edge trim",
      "Hand-finished hems",
    ],
  },
  {
    id: "panther-bracelet",
    title: "Emerald-Eyed Panther Bracelet",
    category: "High Jewelry",
    price: 48000,
    image: unsplash("1548036328-c9fa89d128fa"),
    hoverImage: textureMacro.cheetah,
    animalPrintType: "cheetah",
    material: "18k gold, onyx, tsavorite, emerald eyes",
    description:
      "A panther cuff coiled in 18k blackened gold, its coat hand-set with 2,400 tsavorites, onyx rosettes, and a pair of pear-shaped emerald eyes. Hand-polished mirror belly.",
    sizes: oneSize,
    details: [
      "18k blackened gold, high polish",
      "2,400 tsavorite and onyx inlay stones",
      "Pear-shaped emerald eyes, 0.8 ctw",
      "Carved and set over 9 weeks",
    ],
    featured: true,
  },
  {
    id: "aurelius-ring",
    title: "Aurelius Gold Ring",
    category: "High Jewelry",
    price: 9800,
    image: unsplash("1515562141207-7a88fb7ce338"),
    hoverImage: macroCrop("1515562141207-7a88fb7ce338"),
    animalPrintType: "none",
    material: "18k yellow gold",
    description:
      "A signet ring in brushed 18k yellow gold engraved with the Maison rosette. Weighty, architectural, and made to be handed down.",
    sizes: oneSize,
    details: [
      "18k yellow gold, 21 grams",
      "Hand-engraved maison rosette",
      "Brushed finish with polished bevel",
      "Sizes 49–66 available",
    ],
  },
  {
    id: "vermeil-earrings",
    title: "Vermeil Eclipse Earrings",
    category: "High Jewelry",
    price: 6400,
image: unsplash("1617038220319-276d3cfab638"),
    hoverImage: textureMacro.leopard,
    animalPrintType: "leopard",
    material: "18k vermeil, black spinel",
    description:
      "Architectural crescent earrings layered in 18k vermeil and black spinel, echoing the leopard's halo. Lightweight enough for the opera box, bold enough for the after-party.",
    sizes: oneSize,
    details: [
      "18k gold vermeil over sterling",
      "Black spinel pavé, 1.4 ctw",
      "Secure lever-back fitting",
      "Drop length 4.5 cm",
    ],
  },
  {
    id: "midnight-chrono",
    title: "Midnight Gold Chronograph",
    category: "High Jewelry",
    price: 21000,
    image: unsplash("1523170335258-f5ed11844a49"),
    hoverImage: textureMacro.python,
    animalPrintType: "python",
    material: "40 mm 18k gold case, python-pattern dial",
    description:
      "A 40 mm chronograph in satin-finished 18k gold with a hand-guilloché python-pattern dial. Self-winding, 72-hour reserve, and sealed to 100 metres.",
    sizes: oneSize,
    details: [
      "40 mm 18k gold case",
      "Hand-guilloché python-pattern dial",
      "Self-winding, 72 h power reserve",
      "Black alligator strap, gold deployant",
    ],
    featured: true,
  },
  {
    id: "feline-moto",
    title: "Feline Moto Jacket",
    category: "Everyday Essentials",
    price: 5600,
    image: unsplash("1617127365659-c47fa864d8bc"),
    hoverImage: textureMacro.cheetah,
    animalPrintType: "cheetah",
    material: "Cheetah-print shearling-lined lambskin",
    description:
      "A moto jacket in cheetah-print lambskin with a shearling collar and asymmetric zip. Broken-in by hand so it feels like the fifth decade of a very good life.",
    sizes: apparelSizes,
    details: [
      "Cheetah-print lambskin, hand broken-in",
      "Detachable shearling collar",
      "Asymmetric zip with gold-tone teeth",
      "Interior gun pocket and zip sleeve",
    ],
    featured: true,
  },
  {
    id: "sauvage-parfum",
    title: "Sauvage N°1 Parfum",
    category: "Everyday Essentials",
    price: 480,
    image: unsplash("1541643600914-78b084683601"),
    hoverImage: textureMacro.zebra,
    animalPrintType: "zebra",
    material: "Oud, saffron, smoked vanilla",
    description:
      "The house signature. A dark oriental of oud, saffron, and smoked vanilla, bottled in faceted obsidian glass etched with zebra-stripe gold. 100 ml.",
    sizes: oneSize,
    details: [
      "Eau de parfum — 100 ml",
      "Oud, saffron, smoked vanilla, amber",
      "Faceted obsidian glass bottle",
      "Refillable at any boutique",
    ],
  },
  {
    id: "ambre-parfum",
    title: "Ambre Intense Parfum",
    category: "Everyday Essentials",
    price: 520,
    image: unsplash("1551028719-00167b16eac5"),
    hoverImage: macroCrop("1551028719-00167b16eac5"),
    animalPrintType: "none",
    material: "Amber, leather, incense",
    description:
      "An intense extrait built on amber, saddler's leather, and church incense. Long-wearing, intimate, and unmistakably savage. 75 ml extrait de parfum.",
    sizes: oneSize,
    details: [
      "Extrait de parfum — 75 ml",
      "Amber, leather, incense, sandalwood",
      "Magnetic obsidian cap",
      "Refillable at any boutique",
    ],
  },
  {
    id: "safari-scarf",
    title: "Safari Cashmere Wrap",
    category: "Everyday Essentials",
    price: 2400,
    image: unsplash("1560243563-062bfc001d68"),
    hoverImage: textureMacro.python,
    animalPrintType: "python",
    material: "Python-printed Mongolian cashmere",
    description:
      "A 2-metre wrap in Mongolian cashmere printed with tonal python scales and finished with hand-knotted fringe. Warms the shoulders from the Jet to the chalet.",
    sizes: oneSize,
    details: [
      "100% Mongolian cashmere, 220 gsm",
      "Tonal python-scale print",
      "Hand-knotted silk fringe",
      "Comes in a brass-hinged gift box",
    ],
  },
];

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    kicker: "Winter '26 Collection",
    title: "The Zebra Veldt",
    copy: "Zebra-print velvet trenches and statement outerwear cut for the polar night. Twelve looks, zero hesitation.",
    cta: "EXPLORE WINTER '26",
    image: unsplash("1539008835657-9e8e9680c956", 2000),
    print: "zebra",
  },
  {
    id: 2,
    kicker: "Accessories Object No. 9",
    title: "Python & Cheetah",
    copy: "Python-embossed leather heels and cheetah-print handbags, finished in gold by a single pair of hands.",
    cta: "SHOP THE OBJECTS",
    image: unsplash("1490481651871-ab68de25d43d", 2000),
    print: "python",
  },
  {
    id: 3,
    kicker: "Sartorial Collection",
    title: "Leopard on the Line",
    copy: "Tailored leopard-print jacquard suits and gold cufflinks for the man who is never announced, only seen.",
    cta: "ENTER THE ATELIER",
    image: unsplash("1519085360753-af0119f7cbe7", 2000),
    print: "leopard",
  },
  {
    id: 4,
    kicker: "High Jewelry",
    title: "The Panther Sleeps in Gold",
    copy: "Emerald-eyed panther bracelets draped over silk. One stone at a time, nine weeks per piece.",
    cta: "VIEW HIGH JEWELRY",
    image: unsplash("1548036328-c9fa89d128fa", 2000),
    print: "cheetah",
  },
];

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getProductsByCategory = (
  category: "All" | Product["category"]
): Product[] =>
  category === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === category);