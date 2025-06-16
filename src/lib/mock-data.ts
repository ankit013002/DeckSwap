export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Item {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Generate a few mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Wonderland",
    email: "alice@example.com",
    passwordHash: "$2b$10$abcdefg1234567",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bob Builder",
    email: "bob@example.com",
    passwordHash: "$2b$10$hijklmn8901234",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Carol Singer",
    email: "carol@example.com",
    passwordHash: "$2b$10$opqrst5678901",
    createdAt: new Date().toISOString(),
  },
];

// Generate items linked to users above
export const mockItems: Item[] = [
  {
    id: "1",
    userId: "1",
    title: "Blue-Eyes White Dragon",
    description: "Rare 1st edition trading card in mint condition.",
    category: "card",
    condition: "NM",
    imageUrl: "/images/blue-eyes.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "1",
    title: "Ultra Pro Deck Sleeve",
    description: "Pack of 100 clear sleeves for deck protection.",
    category: "sleeve",
    condition: "new",
    imageUrl: "/images/sleeves-pack.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "2",
    title: "Dragon Playmat",
    description: "Custom dragon-themed playmat, lightly used.",
    category: "playmat",
    condition: "used",
    imageUrl: "/images/dragon-playmat.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
