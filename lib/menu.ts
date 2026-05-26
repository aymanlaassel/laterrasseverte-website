export type MenuItem = {
  name: string;
  price: number | [number, number];
  desc?: string;
  badge?: "NOUVEAU";
  note?: string;
};

export type MenuSection = {
  id: string;
  kicker?: string;
  title: string;
  intro?: string;
  note?: string;
  groups: {
    heading?: string;
    items: MenuItem[];
  }[];
};

export const menu: MenuSection[] = [
  {
    id: "petits-dejeuners",
    kicker: "Formules",
    title: "Petits Déjeuners",
    intro:
      "Inclus dans chaque formule : soupe du jour · boisson chaude · jus d'orange · bouteille d'eau",
    note: "Nos mqilat sont également disponibles au petit-déjeuner (voir carte)",
    groups: [
      {
        items: [
          { name: "L'Express", price: 30, desc: "3 mini viennoiseries" },
          {
            name: "Traditionnel",
            price: 34,
            desc: "Pain complet, miel, olives noires, beurre, confiture",
          },
          {
            name: "Berbère",
            price: 35,
            desc: "3 mini galettes (harcha, rghifa, melouia) · 4 accompagnements (miel, beurre, confiture, jben)",
          },
          {
            name: "Le Beldi",
            price: 35,
            desc: "Mqila de 3 œufs, sauce tomate, olives noires, huile d'olive",
          },
          {
            name: "Le Continental",
            price: 38,
            desc: "3 œufs au fromage, olives noires, huile d'olive",
          },
          {
            name: "Le Fassi",
            price: 40,
            desc: "Tajine khliaa avec 3 œufs, olives noires, huile d'olive",
          },
          {
            name: "Chamali",
            price: 40,
            desc: "3 œufs au plat, dinde fumée, olives noires, jben",
          },
          {
            name: "Forestier",
            price: 42,
            desc: "3 œufs au fromage, dinde fumée, champignons, olives noires",
          },
          { name: "Le Croque", price: 45, desc: "Croque-monsieur ou croque-madame" },
          {
            name: "L'Américain",
            price: 60,
            desc: "Toast au fromage, mqila au choix, mini-crêpe",
          },
        ],
      },
    ],
  },
  {
    id: "boissons",
    kicker: "Nos",
    title: "Boissons",
    groups: [
      {
        heading: "Chaudes",
        items: [
          { name: "Café Espresso", price: 14 },
          { name: "Lait Chaud", price: 14 },
          { name: "Café Crème", price: 15 },
          { name: "Thé à la menthe", price: 15 },
          { name: "Verveine", price: 15 },
          { name: "Lait au Chocolat", price: 16 },
          { name: "Café Séparé", price: 18 },
          { name: "Double Espresso", price: 18 },
        ],
      },
      {
        heading: "Fraîches",
        items: [
          { name: "Eau Plate 50 cl", price: 12 },
          { name: "Soda 33 cl", price: 14 },
          { name: "Jus de Citron", price: 18 },
          { name: "Jus d'Orange", price: 18 },
          { name: "Jus de Pomme", price: 20 },
          { name: "Jus de Banane", price: 20 },
          { name: "Jus Orange-Carotte", price: 22 },
          { name: "Jus d'Orange Banane", price: 22 },
          { name: "Jus Citron Gingembre", price: 22 },
          { name: "Jus d'Orange Fraise", price: 24 },
          { name: "Jus d'Ananas", price: 26 },
          { name: "Jus Mangue", price: 26 },
          { name: "Panaché", price: 26, desc: "Pomme, banane, orange" },
          { name: "Exotique", price: 35, desc: "Ananas, mangue, orange" },
        ],
      },
    ],
  },
  {
    id: "salades",
    title: "Salades",
    groups: [
      {
        items: [
          { name: "Marocaine", price: 18, desc: "Tomate, concombre, oignon, thon" },
          {
            name: "Trio de salade marocaine",
            price: 20,
            desc: "Salade marocaine, zaalouk, tektouka, avec pain",
          },
          {
            name: "Niçoise",
            price: 30,
            desc: "Salade, tomate, carotte, haricots verts, thon, riz, œufs, pomme de terre",
          },
          {
            name: "César",
            price: 45,
            desc: "Salade verte, poulet grillé, croustillant de pain, fromage, œufs, tomate",
          },
          {
            name: "Salade Avocat-Poulet",
            price: 45,
            badge: "NOUVEAU",
            desc: "Salade verte, avocat, poulet grillé, tomate cerise, croûtons, vinaigrette balsamique",
          },
          {
            name: "Salade Marine",
            price: 55,
            desc: "Fruits de mer, tomate, haricots verts, œufs, citron, huile d'olive",
          },
        ],
      },
    ],
  },
  {
    id: "plats-maison",
    title: "Plats Maison",
    note: "Tous nos plats sont servis avec 3 garnitures au choix",
    groups: [
      {
        items: [
          {
            name: "Émincé de poulet",
            price: 60,
            desc: "Émincé de poulet, oignons, champignons, sauce crème",
          },
          {
            name: "Cordon bleu",
            price: 60,
            desc: "Escalope de poulet panée, jambon de dinde, fromage rouge",
          },
          {
            name: "Brochette poulet",
            price: 60,
            desc: "200 g — oignons et tomate grillés",
          },
          {
            name: "Brochette viande hachée",
            price: 60,
            desc: "200 g — oignons et tomate grillés",
          },
          {
            name: "Brochette mixte",
            price: 70,
            desc: "200 g — 2 poulet + 1 viande hachée + 1 saucisse, oignons et tomate grillés",
          },
          { name: "Rfissa", price: 49, note: "Chaque mercredi" },
          { name: "Couscous poulet", price: 49, note: "Chaque vendredi" },
          { name: "Couscous viande", price: 49, note: "Chaque vendredi" },
        ],
      },
    ],
  },
  {
    id: "mqilat",
    title: "Mqilat",
    note: "Toutes nos mqilat sont servies avec un verre de thé à la menthe et peuvent aussi être servies au petit-déjeuner",
    groups: [
      {
        items: [
          {
            name: "Mqila Merguez",
            price: 37,
            badge: "NOUVEAU",
            desc: "Merguez, œufs, sauce tomate, oignons, fromage",
          },
          {
            name: "Mqila Poulet",
            price: 37,
            badge: "NOUVEAU",
            desc: "Poulet, champignons, fromage, œufs",
          },
          {
            name: "Mqila Viande Hachée",
            price: 37,
            badge: "NOUVEAU",
            desc: "Viande hachée, oignons, œufs, sauce tomate, fromage",
          },
          {
            name: "Mqila Bouzeroug",
            price: 37,
            badge: "NOUVEAU",
            desc: "Escargots, œufs, épices, coriandre, fromage",
          },
          {
            name: "Mqila Mixte",
            price: 45,
            badge: "NOUVEAU",
            desc: "Kefta, merguez, œufs, sauce tomate, fromage",
          },
          {
            name: "Mqila Fruits de Mer",
            price: 49,
            badge: "NOUVEAU",
            desc: "Crevettes, calamars, œufs, ail, persil, fromage",
          },
        ],
      },
    ],
  },
  {
    id: "sandwichs-tacos",
    title: "Sandwichs & Tacos",
    intro: "Tous nos sandwichs et tacos sont accompagnés de frites maison",
    groups: [
      {
        heading: "Sandwichs",
        items: [
          {
            name: "Sandwich Poulet",
            price: 38,
            desc: "Poulet grillé, salade, tomate, oignon, mayonnaise + frites",
          },
          {
            name: "Sandwich Viande Hachée",
            price: 38,
            desc: "Steak haché, salade, tomate, oignon, mayonnaise + frites",
          },
          {
            name: "Sandwich Saucisse",
            price: 38,
            desc: "Saucisse, salade, tomate, oignon, ketchup, mayonnaise + frites",
          },
          {
            name: "Sandwich Mixte",
            price: 45,
            desc: "Poulet, viande hachée, saucisse, salade, tomate, sauces + frites",
          },
        ],
      },
      {
        heading: "Tacos",
        items: [
          {
            name: "Tacos Poulet",
            price: 38,
            desc: "Galette, poulet, fromage rouge, sauce blanche + frites",
          },
          {
            name: "Tacos Viande Hachée",
            price: 38,
            desc: "Galette, steak haché, fromage rouge, sauce blanche + frites",
          },
          {
            name: "Tacos Saucisse",
            price: 38,
            desc: "Galette, saucisse, fromage rouge, sauce blanche + frites",
          },
          {
            name: "Tacos Mixte",
            price: 48,
            desc: "Galette, poulet, viande hachée, saucisse, fromage, sauce blanche + frites",
          },
        ],
      },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    intro: "Servies à partir de 15h",
    groups: [
      {
        items: [
          { name: "Margarita", price: 30, desc: "Sauce tomate, mozzarella, basilic" },
          {
            name: "Végétarienne",
            price: 35,
            desc: "Sauce tomate, mozzarella, poivron, champignons, oignon",
          },
          {
            name: "Chicken",
            price: 40,
            desc: "Sauce tomate, mozzarella, poulet grillé, poivron, oignon",
          },
          {
            name: "Thon",
            price: 42,
            desc: "Sauce tomate, mozzarella, thon, oignon, olives",
          },
          {
            name: "Bolognaise",
            price: 42,
            desc: "Sauce tomate, mozzarella, viande hachée, oignon",
          },
          {
            name: "Carbonara",
            price: 42,
            desc: "Crème, mozzarella, charcuterie, oignon, œuf",
          },
          {
            name: "Fruits de Mer",
            price: 55,
            desc: "Sauce tomate, mozzarella, crevettes, calamars, ail, persil",
          },
          {
            name: "Hrira maison",
            price: 22,
            desc: "Soupe traditionnelle marocaine, servie avec dattes et œufs",
          },
        ],
      },
    ],
  },
  {
    id: "crepes",
    title: "Crêpes",
    groups: [
      {
        heading: "Salées",
        items: [
          { name: "Fromage", price: 26, desc: "Fromage rouge fondant" },
          { name: "Poulet Champignons", price: 38, desc: "Poulet grillé, champignons, fromage" },
          { name: "Charcuterie Fromage", price: 38, desc: "Charcuterie de dinde, fromage, crème" },
          { name: "Viande Hachée", price: 40, desc: "Viande hachée, oignon, fromage" },
          { name: "Fruits de Mer", price: 45, desc: "Crevettes, calamars, fromage, ail, persil" },
        ],
      },
      {
        heading: "Sucrées",
        items: [
          { name: "Nature", price: 13 },
          { name: "Suzette", price: 15 },
          { name: "Miel", price: 18 },
          { name: "Nutella", price: 25 },
          { name: "Nutella Banane", price: 30 },
          { name: "Nutella Fraise", price: 30, note: "de saison" },
          { name: "Double Nutella", price: 30 },
        ],
      },
    ],
  },
  {
    id: "a-la-carte",
    title: "À La Carte",
    groups: [
      {
        heading: "À la carte",
        items: [
          { name: "Rghifa", price: 5 },
          { name: "Harcha", price: 5 },
          { name: "3 mini viennoiseries", price: 15 },
          { name: "Pain complet", price: 15, desc: "Avec 3 garnitures" },
          { name: "3 œufs nature", price: 15 },
          { name: "Omelette Fromage", price: 20 },
          { name: "Omelette Fromage Charcuterie", price: 25 },
          {
            name: "Omelette Champignons",
            price: 25,
            desc: "Champignons, fromage, oignon",
          },
          { name: "Tajine Khlii", price: 30 },
        ],
      },
      {
        heading: "Suppléments",
        items: [
          { name: "Huile d'Olive", price: 3 },
          { name: "Œuf", price: 3 },
          { name: "Fromage rouge", price: 6 },
          { name: "Charcuterie", price: 10 },
          { name: "Légumes sautés", price: 12 },
          { name: "Tektouka ou zaalouk", price: 12 },
          { name: "Riz", price: 12 },
          { name: "Frites maison", price: 12 },
          { name: "Poulet", price: 15 },
          { name: "Viande Hachée", price: 15 },
        ],
      },
    ],
  },
];

export const contact = {
  phone: ["08 08 52 58 82", "06 61 97 38 12"],
  hours: "7h00 — 23h00",
  address: {
    line1: "382 RDC, Secteur 1, Ryad",
    line2: "Oulad Mtaa, Temara 12000",
    country: "Maroc",
  },
  instagram: "@laterrasseverte",
  instagramUrl: "https://www.instagram.com/laterrasseverte/",
  tagline: "Le Goût Spécial À La Terrasse Verte",
};

export const specials = [
  { day: "Mercredi", dish: "Rfissa" },
  { day: "Vendredi", dish: "Couscous (poulet ou viande)" },
];

export type FlatItem = MenuItem & {
  id: string;
  sectionId: string;
  sectionTitle: string;
  groupHeading?: string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllItems(): FlatItem[] {
  return menu.flatMap((section) =>
    section.groups.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        id: `${section.id}--${slugify(item.name)}${group.heading ? "--" + slugify(group.heading) : ""}`,
        sectionId: section.id,
        sectionTitle: section.title,
        groupHeading: group.heading,
      }))
    )
  );
}

export const itemById: Map<string, FlatItem> = new Map(
  getAllItems().map((i) => [i.id, i])
);

export function priceToNumber(p: MenuItem["price"]): number {
  return typeof p === "number" ? p : p[0];
}

export function formatPrice(p: MenuItem["price"]): string {
  return typeof p === "number" ? `${p} DH` : `${p[0]} / ${p[1]} DH`;
}

export const glovoUrl = "https://glovoapp.com/ma/fr/temara/";

