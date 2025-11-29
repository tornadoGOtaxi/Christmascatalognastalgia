
import { Product, Store } from './types';

export const CATEGORIES = ['Action Figures', 'Dolls', 'Building Sets', 'Electronics', 'Arts & Crafts', 'Board Games', 'Outdoor', 'Plush', 'Vehicles', 'Novelty'];

export const STORES: Store[] = [
  { id: 'amazon', name: 'Amazon', type: 'online', logo: '📦', color: 'bg-orange-400' },
  { id: 'walmart', name: 'Walmart', type: 'both', logo: '🛒', color: 'bg-blue-600' },
  { id: 'target', name: 'Target', type: 'both', logo: '🎯', color: 'bg-red-600' },
  { id: 'bestbuy', name: 'Best Buy', type: 'both', logo: '🏷️', color: 'bg-blue-800' },
  { id: 'costco', name: 'Costco', type: 'both', logo: '🏬', color: 'bg-red-700' },
  { id: 'kohls', name: 'Kohl’s', type: 'both', logo: '🛍️', color: 'bg-purple-700' },
  { id: 'bjs', name: 'BJ’s Wholesale', type: 'both', logo: '📦', color: 'bg-red-500' },
  { id: 'dollartree', name: 'Dollar Tree', type: 'physical', logo: '🌳', color: 'bg-green-600' },
  { id: 'dollargeneral', name: 'Dollar General', type: 'physical', logo: '🟡', color: 'bg-yellow-500' },
  { id: 'macys', name: 'Macy’s', type: 'both', logo: '⭐', color: 'bg-red-600' },
  { id: 'tjmaxx', name: 'T.J. Maxx', type: 'physical', logo: '👗', color: 'bg-indigo-700' },
  { id: 'hobbytown', name: 'HobbyTown USA', type: 'both', logo: '🚂', color: 'bg-red-500' },
  { id: 'learningexpress', name: 'Learning Express', type: 'physical', logo: '🧠', color: 'bg-blue-400' },
  { id: 'spencers', name: 'Spencer Gifts', type: 'physical', logo: '🎸', color: 'bg-purple-900' },
  { id: 'fao', name: 'FAO Schwarz', type: 'physical', logo: '🧸', color: 'bg-stone-800' },
  { id: 'toysrus', name: 'Toys "R" Us', type: 'online', logo: '🦒', color: 'bg-orange-500' },
];

// Curated list of real-world products
export const PRODUCTS: Product[] = [
  // Amazon
  { id: 'amz-1', title: 'LEGO Star Wars Millennium Falcon', price: 159.99, storeId: 'amazon', category: 'Building Sets', ageMin: 9, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=400', description: 'The classic Corellian freighter with detailed interior and crew minifigures.', rating: 4.9 },
  { id: 'amz-2', title: 'Kindle Paperwhite Kids', price: 119.99, originalPrice: 159.99, storeId: 'amazon', category: 'Electronics', ageMin: 7, ageMax: 14, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1594980596853-7541f53d865c?auto=format&fit=crop&q=80&w=400', description: 'Waterproof e-reader with 1 year of Amazon Kids+ included.', rating: 4.8 },
  { id: 'amz-3', title: 'Echo Dot Kids Edition (Owl)', price: 29.99, originalPrice: 59.99, storeId: 'amazon', category: 'Electronics', ageMin: 4, ageMax: 10, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1543512214-318c77a07293?auto=format&fit=crop&q=80&w=400', description: 'Smart speaker designed for kids with parental controls.', rating: 4.7 },
  
  // Walmart
  { id: 'wmt-1', title: 'Barbie Dreamhouse 2024', price: 179.00, storeId: 'walmart', category: 'Dolls', ageMin: 3, ageMax: 9, gender: 'girl', imageUrl: 'https://images.unsplash.com/photo-1544640822-6b990f230571?auto=format&fit=crop&q=80&w=400', description: '3-story dollhouse with pool, slide, and elevator.', rating: 4.8 },
  { id: 'wmt-2', title: 'Huffy 16" Sea Star Bike', price: 78.00, storeId: 'walmart', category: 'Outdoor', ageMin: 4, ageMax: 7, gender: 'girl', imageUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=400', description: 'Training wheels included, perfect for beginners.', rating: 4.5 },
  { id: 'wmt-3', title: 'Monster Jam Megalodon RC', price: 49.97, storeId: 'walmart', category: 'Vehicles', ageMin: 4, ageMax: 10, gender: 'boy', imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400', description: 'Amphibious remote control truck that drives on water.', rating: 4.6 },

  // Target
  { id: 'tgt-1', title: 'Paw Patrol Lookout Tower', price: 39.99, originalPrice: 49.99, storeId: 'target', category: 'Action Figures', ageMin: 3, ageMax: 6, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400', description: 'Features lights, sounds, and working elevator.', rating: 4.7 },
  { id: 'tgt-2', title: 'Nintendo Switch OLED Model', price: 349.99, storeId: 'target', category: 'Electronics', ageMin: 6, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1629813291583-0949d015c7cb?auto=format&fit=crop&q=80&w=400', description: 'Vibrant 7-inch OLED screen with enhanced audio.', rating: 4.9 },
  { id: 'tgt-3', title: 'Squishmallows 16" Plush', price: 24.99, storeId: 'target', category: 'Plush', ageMin: 0, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1533226458520-6fbd77d46c8e?auto=format&fit=crop&q=80&w=400', description: 'Ultra-soft, collectible plush toy.', rating: 5.0 },

  // Best Buy
  { id: 'bb-1', title: 'Sony PlayStation 5 Slim', price: 499.99, storeId: 'bestbuy', category: 'Electronics', ageMin: 10, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400', description: 'The latest generation console with ultra-high speed SSD.', rating: 4.9 },
  { id: 'bb-2', title: 'DJI Mini 2 SE Drone', price: 339.00, storeId: 'bestbuy', category: 'Electronics', ageMin: 14, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=400', description: 'Lightweight, portable drone with QHD video.', rating: 4.8 },

  // FAO Schwarz
  { id: 'fao-1', title: 'FAO Schwarz Giant Piano Mat', price: 79.99, storeId: 'fao', category: 'Electronics', ageMin: 3, ageMax: 10, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=400', description: 'The iconic 70-inch dance-on piano mat.', rating: 4.6 },
  { id: 'fao-2', title: 'Ride-On Roadster Car', price: 299.99, storeId: 'fao', category: 'Vehicles', ageMin: 3, ageMax: 6, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1549823903-8889416556c5?auto=format&fit=crop&q=80&w=400', description: 'Premium vintage style ride-on pedal car.', rating: 4.9 },

  // Costco
  { id: 'cst-1', title: 'KidKraft Wooden Play Kitchen', price: 129.99, storeId: 'costco', category: 'Dolls', ageMin: 3, ageMax: 8, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1596464716127-f9a8659b4b61?auto=format&fit=crop&q=80&w=400', description: 'Large modern play kitchen with lights and ice maker sounds.', rating: 4.8 },
  { id: 'cst-2', title: 'LEGO Harry Potter Hogwarts Castle', price: 169.99, storeId: 'costco', category: 'Building Sets', ageMin: 10, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1632297746413-5f0488424a6e?auto=format&fit=crop&q=80&w=400', description: 'Detailed replica of the Great Hall and towers.', rating: 4.9 },

  // HobbyTown
  { id: 'ht-1', title: 'Traxxas Slash RC Truck', price: 249.99, storeId: 'hobbytown', category: 'Vehicles', ageMin: 14, ageMax: 18, gender: 'boy', imageUrl: 'https://images.unsplash.com/photo-1558258695-1f652697b054?auto=format&fit=crop&q=80&w=400', description: 'High-performance short-course racing truck.', rating: 4.9 },
  { id: 'ht-2', title: 'Hornby Electric Train Set', price: 189.99, storeId: 'hobbytown', category: 'Vehicles', ageMin: 8, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1616788487383-c5949d21c32c?auto=format&fit=crop&q=80&w=400', description: 'Classic steam locomotive starter set.', rating: 4.7 },

  // Dollar Tree (Value items)
  { id: 'dt-1', title: 'Holiday Coloring Book', price: 1.25, storeId: 'dollartree', category: 'Arts & Crafts', ageMin: 3, ageMax: 10, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400', description: 'Festive themed pages with stickers.', rating: 4.2 },
  { id: 'dt-2', title: 'Plastic Army Men Tub', price: 1.25, storeId: 'dollartree', category: 'Action Figures', ageMin: 5, ageMax: 10, gender: 'boy', imageUrl: 'https://images.unsplash.com/photo-1593085512500-bfd1193a620b?auto=format&fit=crop&q=80&w=400', description: 'Classic green army men figures.', rating: 4.0 },

  // Toys R Us
  { id: 'tru-1', title: 'Geoffrey the Giraffe Plush', price: 19.99, storeId: 'toysrus', category: 'Plush', ageMin: 0, ageMax: 12, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc7?auto=format&fit=crop&q=80&w=400', description: 'Exclusive Toys R Us mascot plush.', rating: 4.8 },

  // Spencer's
  { id: 'spn-1', title: 'Lava Lamp (Classic)', price: 34.99, storeId: 'spencers', category: 'Novelty', ageMin: 12, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1563293867-b844bf6707a3?auto=format&fit=crop&q=80&w=400', description: 'Retro wax motion lamp, blue liquid.', rating: 4.6 },

  // Learning Express
  { id: 'le-1', title: 'Magna-Tiles 100-Piece Set', price: 119.99, storeId: 'learningexpress', category: 'Building Sets', ageMin: 3, ageMax: 10, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400', description: 'Clear colors magnetic building tiles.', rating: 5.0 },
  { id: 'le-2', title: 'Crazy Aaron’s Thinking Putty', price: 14.99, storeId: 'learningexpress', category: 'Arts & Crafts', ageMin: 5, ageMax: 18, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1616422477382-71c82ec45145?auto=format&fit=crop&q=80&w=400', description: 'Super illusions oil slick putty.', rating: 4.7 },

  // Kohl's
  { id: 'khl-1', title: 'Melissa & Doug Grocery Store', price: 199.99, originalPrice: 249.99, storeId: 'kohls', category: 'Dolls', ageMin: 3, ageMax: 8, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1606001220473-b3c07657989d?auto=format&fit=crop&q=80&w=400', description: 'Freestanding wooden grocery store with belt.', rating: 4.8 },

  // Macy's
  { id: 'mcy-1', title: 'FAO Schwarz Jewelry Kit', price: 29.99, storeId: 'macys', category: 'Arts & Crafts', ageMin: 8, ageMax: 14, gender: 'girl', imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400', description: 'Create your own metallic jewelry.', rating: 4.5 },

  // TJ Maxx
  { id: 'tjx-1', title: 'Designer Art Set (Assorted)', price: 19.99, originalPrice: 39.99, storeId: 'tjmaxx', category: 'Arts & Crafts', ageMin: 6, ageMax: 14, gender: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400', description: 'Deluxe painting and drawing kit.', rating: 4.4 },

  // Generic Filler for bulk
  ...Array.from({ length: 30 }).map((_, i) => ({
      id: `gen-${i}`,
      title: ['Hot Wheels Track Set', 'Nerf Elite Blaster', 'Crayola Inspiration Case', 'Uno Card Game', 'Monopoly Board Game'][i % 5] + ` (Ed. ${i+1})`,
      price: [24.99, 19.99, 29.99, 5.99, 19.99][i % 5],
      storeId: STORES[i % STORES.length].id,
      category: CATEGORIES[i % CATEGORIES.length],
      ageMin: 5,
      ageMax: 12,
      gender: ['boy', 'neutral', 'neutral', 'neutral', 'girl'][i % 5] as any,
      imageUrl: `https://images.unsplash.com/photo-${['1566576912902-1d63601852ed', '1558877385-3530d0988c59', '1515488042310-fa27877e594f', '1611996575743-98a002983796', '1585366119957-e9730b6d0f60'][i % 5]}?auto=format&fit=crop&q=80&w=400`,
      description: "A popular holiday choice available at this retailer.",
      rating: 4.5
  }))
];
