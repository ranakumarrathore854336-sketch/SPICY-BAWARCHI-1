/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review, Offer } from "./types";

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- VEGETABLES ---
  {
    id: "veg-01",
    name: "Paneer Butter Masala",
    price: 210,
    rating: 4.8,
    category: "Vegetables",
    isVeg: true,
    isPopular: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60",
    description: "Rich and creamy dish of paneer (cottage cheese) in a tomato, butter, and cashew sauce infused with secret spices.",
    ingredients: ["Paneer", "Butter", "Tomato gravy", "Cashews", "Cream"],
    spicyLevel: 1
  },
  {
    id: "veg-02",
    name: "Paneer Kadhai",
    price: 220,
    rating: 4.7,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Spicy and delicious cottage cheese cooked in restaurant-style gravy with thick capsicum and onion dices in a traditional Indian wok.",
    ingredients: ["Paneer", "Capsicum", "Onions", "Freshly-ground Kadhai spices"],
    spicyLevel: 2
  },
  {
    id: "veg-03",
    name: "Paneer Do Pyaza",
    price: 210,
    rating: 4.5,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1618412613583-e8ee5abebcc7?w=500&auto=format&fit=crop&q=60",
    description: "Curb your paneer cravings with this rich semi-dry gravy prepared with onions added in two stages for two distinct textures.",
    ingredients: ["Paneer", "Onions", "Tomato", "Indian herbs"],
    spicyLevel: 1
  },
  {
    id: "veg-04",
    name: "Mutter Paneer",
    price: 200,
    rating: 4.4,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "A classic Indian pairing of soft green peas and fresh paneer cubes cooked in a spiced tomato-curry base.",
    ingredients: ["Paneer", "Green Peas", "Tomato", "Cumin", "Ginger"],
    spicyLevel: 1
  },
  {
    id: "veg-05",
    name: "Shahi Paneer",
    price: 240,
    rating: 4.9,
    category: "Vegetables",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
    description: "Royal cottage cheese chunks prepared in a silky, creamy, aromatic golden gravy made of yogurt, nuts, and cardamoms.",
    ingredients: ["Paneer", "Yogurt", "Cashew paste", "Saffron", "Cardamom"],
    spicyLevel: 0
  },
  {
    id: "veg-06",
    name: "Paneer Tikka Masala",
    price: 260,
    rating: 4.8,
    category: "Vegetables",
    isVeg: true,
    isTodaySpecial: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    description: "Clay-oven-charred paneer tikka kebabs tossed lovingly in a delightfully spicy and smoky tandoori tomato masala.",
    ingredients: ["Tandoori Paneer", "Smoked Capsicum", "Yogurt base", "Garam Masala"],
    spicyLevel: 2
  },
  {
    id: "veg-07",
    name: "Soya Chaap Masala",
    price: 200,
    rating: 4.5,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Juicy chunks of vegetarian soya chaap marinated, fried, and cooked in an exquisitely thick curry loaded with traditional spices.",
    ingredients: ["Soya Chaap", "Onion Tomato Masala", "Coriander", "Ginger"],
    spicyLevel: 2
  },
  {
    id: "veg-08",
    name: "Boil Soy Masala",
    price: 220,
    rating: 4.3,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Healthy boiled soy nuggets sautéed into an authentic and fiber-rich Bihar styled masala gravy.",
    ingredients: ["Boiled Soy Nuggets", "Aromatic Spices", "Kasturi Methi"],
    spicyLevel: 1
  },
  {
    id: "veg-09",
    name: "Mix Veg",
    price: 220,
    rating: 4.4,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    description: "Assorted seasonal fresh vegetables cooked with onions, tomatoes and freshly chopped greens in a semi-dry gravy.",
    ingredients: ["Carrots", "Beans", "Peas", "Cauliflower", "Paneer", "Masala"],
    spicyLevel: 1
  },
  {
    id: "veg-10",
    name: "Special Mix Veg",
    price: 250,
    rating: 4.7,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    description: "Bawarchi's signature chef-style premium mix veg loaded with baby corn, mushrooms, paneer cubes, and a splash of pure fresh cream.",
    ingredients: ["Baby Corn", "Mushrooms", "Paneer", "Butter", "Premium Spices"],
    spicyLevel: 2
  },
  {
    id: "veg-11",
    name: "Malai Kofta",
    price: 250,
    rating: 4.9,
    category: "Vegetables",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Melting-in-the-mouth paneer and potato dumplings (kofta) submerged in a luxurious, sweetish cashew-cream gravy.",
    ingredients: ["Paneer Kofta", "Cashew Gravy", "Kishmish", "Fresh Cream"],
    spicyLevel: 0
  },
  {
    id: "veg-12",
    name: "Potato And Pyaza",
    price: 160,
    rating: 4.2,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: " बिहार स्पेशल! A homely preparation of baby potatoes stir fried with scallions (pyaza) and dry red chillies.",
    ingredients: ["Potatoes", "Scallions", "Bihar Red Chillies", "Mustard Oil"],
    spicyLevel: 2
  },
  {
    id: "veg-13",
    name: "Aloo Dum",
    price: 150,
    rating: 4.3,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Boiled potatoes slow cooked in a rich, deeply spiced tomato and onion gravy in Dum pukht style.",
    ingredients: ["Potatoes", "Dum cooked masala", "Fennel", "Yogurt"],
    spicyLevel: 1
  },
  {
    id: "veg-14",
    name: "Aloo Kadhai",
    price: 160,
    rating: 4.1,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Crispy fried potatoes wok-tossed with green bell pepper, tomatoes and special whole herbs.",
    ingredients: ["Potatoes", "Capsicum", "Kadhai spices", "Onion herbs"],
    spicyLevel: 2
  },
  {
    id: "veg-15",
    name: "Veg Jhalfrezi",
    price: 190,
    rating: 4.4,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    description: "Slightly tangy and spicy stir-fried vegetables finished with a touch of vinegar and sweet-sour tomato glazes.",
    ingredients: ["Multicolor Capsicum", "Beans", "Mushroom", "Vinegar", "Spicy green chillies"],
    spicyLevel: 2
  },
  {
    id: "veg-16",
    name: "Aloo Matar",
    price: 150,
    rating: 4.2,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Simple yet satisfying home-style curry made with fresh sweet green peas and soft potato halves.",
    ingredients: ["Potatoes", "Green peas", "Cumin seeds", "Onion curry base"],
    spicyLevel: 1
  },
  {
    id: "veg-17",
    name: "Mushroom Masala",
    price: 220,
    rating: 4.6,
    category: "Vegetables",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Fresh button mushrooms simmered beautifully in a rustic, brown onion gravy accented with fresh roasted spices.",
    ingredients: ["Button Mushrooms", "Roasted whole spices", "Garam Masala", "Coriander"],
    spicyLevel: 2
  },
  {
    id: "veg-18",
    name: "Mushroom Kadhai",
    price: 220,
    rating: 4.5,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Fresh mushrooms cooked in a piping hot wok with bell peppers and traditional coriander-fennel spiced blend.",
    ingredients: ["Mushrooms", "Bell pepper", "Kadhai herbs", "Tomato reduction"],
    spicyLevel: 2
  },
  {
    id: "veg-19",
    name: "Green Peas Masala",
    price: 200,
    rating: 4.3,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Thick vegetable gravy topped with loads of boiled sweet green peas and buttery cream.",
    ingredients: ["Green Peas", "Buttery Cream", "Garam Masala", "Yogurt blend"],
    spicyLevel: 1
  },
  {
    id: "veg-20",
    name: "Tawa Veg (Bawarchi Special)",
    price: 250,
    rating: 4.9,
    category: "Vegetables",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Our signature preparation! Selected premium seasonal veggies cooked over an iron griddle (Tawa) with rich home-pounded secret spices.",
    ingredients: ["Assorted Premium Veggies", "Spicy Tawa Masala", "Ghee", "Mint chutney drizzle"],
    spicyLevel: 3
  },
  {
    id: "veg-21",
    name: "Mushroom Do Pyaza",
    price: 210,
    rating: 4.4,
    category: "Vegetables",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "A gorgeous semi-dry dish blending delicious button mushrooms with double standard caramelized onions.",
    ingredients: ["Button mushrooms", "Diced onions", "Caramelized onion gravy", "Dry spices"],
    spicyLevel: 1
  },

  // --- SPECIAL THALI ---
  {
    id: "thali-01",
    name: "Special Thali",
    price: 210,
    rating: 4.9,
    category: "Special Thali",
    isVeg: true,
    isPopular: true,
    isTodaySpecial: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    description: "A majestic wholesome experience! Includes 2 Butter Roti or 1 Butter Naan, Roasted Papad, Dal Makhani, Mix Veg, Paneer Butter Masala, aromatic Jeera Rice, and high-quality fresh garden Salad.",
    ingredients: ["Butter Roti/Naan", "Dal Makhani", "Paneer Butter Masala", "Mix Veg", "Jeera Rice", "Papad", "Salad"],
    spicyLevel: 1
  },

  // --- TANDOOR SE ---
  {
    id: "tandoor-01",
    name: "Paneer Tikka",
    price: 240,
    rating: 4.8,
    category: "Tandoor Se",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    description: "Yogurt-marinated succulent paneer cubes skewered beautifully with bell peppers and roasted in the clay tandoor.",
    ingredients: ["Paneer chunks", "Yogurt marinade", "Kasturi methi", "Green capsicum"],
    spicyLevel: 2
  },
  {
    id: "tandoor-02",
    name: "Hara Bhara Kebab",
    price: 190,
    rating: 4.6,
    category: "Tandoor Se",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop&q=60",
    description: "Deep green delicate patties prepared with fresh farm spinach, boiled potatoes, and green peas infused with warm spices.",
    ingredients: ["Spinach", "Green Peas", "Mint", "Mashed Potatoes", "Roasted cashew topping"],
    spicyLevel: 1
  },
  {
    id: "tandoor-03",
    name: "Tandoori Momo",
    price: 160,
    rating: 4.7,
    category: "Tandoor Se",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "Authentic vegetable momos marinated in fiery tandoori red masala and chargrilled to absolute perfection with live charcoal smoke.",
    ingredients: ["Momo dumplings", "Tandoori paste", "Chaat Masala", "Onion rings"],
    spicyLevel: 2
  },
  {
    id: "tandoor-04",
    name: "Soya Chaap",
    price: 220,
    rating: 4.5,
    category: "Tandoor Se",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Marinated high-protein soy wraps baked golden on skewers inside the tandoor oven, brushed with pure butter.",
    ingredients: ["Soy chaap logs", "Special tandoor spices", "Amul Butter", "Cream"],
    spicyLevel: 2
  },

  // --- APPETIZERS ---
  {
    id: "app-01",
    name: "Veg Pakoda",
    price: 120,
    rating: 4.3,
    category: "Appetizers",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Crispy gram-flour battered mixed vegetable fritters deep fried, served hot with tamarind and green coriander chutneys.",
    ingredients: ["Seasonal vegetables", "Besan (Gram Flour)", "Ajwain", "Chutney blend"],
    spicyLevel: 1
  },
  {
    id: "app-02",
    name: "Paneer Pakoda",
    price: 160,
    rating: 4.7,
    category: "Appetizers",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    description: "Thick double-layered cottage cheese blocks sandwiched with home spicy mint paste, deep fried in a crunchy golden shell.",
    ingredients: ["Slab Paneer", "Mint spread", "Besan", "Chat masala"],
    spicyLevel: 1
  },
  {
    id: "app-03",
    name: "French Fries",
    price: 110,
    rating: 4.4,
    category: "Appetizers",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60",
    description: "Classic potato batons deep-fried gold, sprinkled with salt and served with high grade tomato ketchup.",
    ingredients: ["Imported potatoes", "Iodized salt", "Premium frying oil"],
    spicyLevel: 0
  },

  // --- SOUP ---
  {
    id: "soup-01",
    name: "Hot & Sour Soup",
    price: 90,
    rating: 4.4,
    category: "Soup",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    description: "Spicy and tangy thick veg soup loaded with dark mushrooms, bamboo shoots, and splash of oriental chili vinegar.",
    ingredients: ["Shredded veggies", "Bamboo shoots", "Dark Soy", "Vinegar", "Chili paste"],
    spicyLevel: 2
  },
  {
    id: "soup-02",
    name: "Veg Manchow Soup",
    price: 90,
    rating: 4.5,
    category: "Soup",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    description: "A popular Indo-Chinese dark soup infused with garlic, ginger, green chillies, topped with plenty of crunchy crispy fried noodles.",
    ingredients: ["Garlic ginger base", "Soy sauce", "Minced vegetables", "Crunchy fried noodles"],
    spicyLevel: 2
  },

  // --- BEVERAGES ---
  {
    id: "bev-01",
    name: "Mineral Water",
    price: 20,
    rating: 4.9,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=60",
    description: "Chilled pure packaged mineral water for ultimate refreshment.",
    ingredients: ["H2O", "Minerals"],
    spicyLevel: 0
  },
  {
    id: "bev-02",
    name: "Coke",
    price: 30,
    rating: 4.6,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
    description: "Cold sparkly Coca-Cola served in a chilled glass.",
    ingredients: ["Carbonated Drink"],
    spicyLevel: 0
  },
  {
    id: "bev-03",
    name: "Fanta",
    price: 30,
    rating: 4.5,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1624515694726-2a781faae3ed?w=500&auto=format&fit=crop&q=60",
    description: "Bubbly and bright orange Fanta soda.",
    ingredients: ["Orange Soda"],
    spicyLevel: 0
  },
  {
    id: "bev-04",
    name: "Mazza",
    price: 30,
    rating: 4.7,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=60",
    description: "Relish the real juicy sweetness of handpicked Alphonso mangoes.",
    ingredients: ["Mango Pulp"],
    spicyLevel: 0
  },
  {
    id: "bev-05",
    name: "Sting",
    price: 30,
    rating: 4.3,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
    description: "Energetic and crisp fizzy red sweet energy booster beverage.",
    ingredients: ["Energy drink", "Caffeine"],
    spicyLevel: 0
  },
  {
    id: "bev-06",
    name: "Lassi",
    price: 30,
    rating: 4.8,
    category: "Beverages",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Authentic, cooling Punjabi style sweet yogurt lassi churned with pure cardamom and finished with thick cream on top.",
    ingredients: ["Thick curd", "Sugar", "Vark", "Pista", "Kesar essence"],
    spicyLevel: 0
  },
  {
    id: "bev-07",
    name: "Masala Coke",
    price: 50,
    rating: 4.8,
    category: "Beverages",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=60",
    description: "Bawarchi special high punch mocktail featuring coke loaded with black salt, lemon, cumin, and fresh mint leaves.",
    ingredients: ["Coke", "Lemon juice", "Kala Namak", "Fresh mint", "Cumin powder"],
    spicyLevel: 0
  },

  // --- MOMOS ---
  {
    id: "momo-01",
    name: "Veg Momo",
    price: 70,
    rating: 4.5,
    category: "Momos",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "Delectable steaming momos stuffed with minced cabbage, carrots, spring onions, and oriental dry seasonings.",
    ingredients: ["Wheat dough", "Minced cabbage", "Carrots", "Sichuan garlic dip"],
    spicyLevel: 1
  },
  {
    id: "momo-02",
    name: "Fry Momo",
    price: 90,
    rating: 4.6,
    category: "Momos",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "Perfectly steamed momos deep fried to golden crispy crunchiness, served alongside fiery red chili garlic dip.",
    ingredients: ["Wheat wrap", "Soy fillers", "Veg slaw", "Spicy Sichuan paste"],
    spicyLevel: 2
  },
  {
    id: "momo-03",
    name: "Chilly Momo",
    price: 140,
    rating: 4.8,
    category: "Momos",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "Crispy fried momos tossed in a dynamic, semi-dry, dark soy chili garlic fusion glaze with capsicum and fresh scallions.",
    ingredients: ["Fried momos", "Soy glaze", "Chili oil", "Diced capsicum"],
    spicyLevel: 3
  },
  {
    id: "momo-04",
    name: "Jhol Momo",
    price: 150,
    rating: 4.9,
    category: "Momos",
    isVeg: true,
    isTodaySpecial: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "Nepali style state-of-the-art momos served floating in a rich, warm, cooling spiced chutney broth made of roasted sesame, tomatoes, and hint of lime.",
    ingredients: ["Steamed dumplings", "Sesame peanut broth", "Himalayan herbs", "Lime"],
    spicyLevel: 2
  },
  {
    id: "momo-05",
    name: "Sizzler Momo",
    price: 170,
    rating: 4.9,
    category: "Momos",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    description: "An absolute visual spectacle! Piping hot sizzling cabbage-bedded momo dumplings smothered in smoking spicy schezwan glaze, served on a cast iron pan.",
    ingredients: ["Sizzling skillet", "Momo chunks", "Cabbage bed", "Schezwan chili sauce"],
    spicyLevel: 3
  },

  // --- CHILLY SPECIALS ---
  {
    id: "chilly-01",
    name: "Baby Corn Crispy",
    price: 220,
    rating: 4.6,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Golden battered tender baby corn spears fried crackling crispy, tossed with standard garlic and dark herbs.",
    ingredients: ["Tender Baby Corn", "Corn Flour coat", "Spring onion garnish"],
    spicyLevel: 2
  },
  {
    id: "chilly-02",
    name: "Baby Corn Chilly",
    price: 220,
    rating: 4.5,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Deep fried baby corn bits finished in a highly appetizing thick chili-garlic-capsicum glaze.",
    ingredients: ["Baby Corn", "Capsicum dice", "Chili sauce base"],
    spicyLevel: 2
  },
  {
    id: "chilly-03",
    name: "Chilly Potato",
    price: 150,
    rating: 4.4,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Golden fried potato wedges coated instantly in sweet and spicy dark garlic soy glazes.",
    ingredients: ["Potato fingers", "Sichuan pepper", "Starch", "Onion stems"],
    spicyLevel: 2
  },
  {
    id: "chilly-04",
    name: "Honey Potato",
    price: 140,
    rating: 4.7,
    category: "Chilly Specials",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Crispy french fries beautifully tossed with sweet wild honey, dark chili paste, topped with generic toasted sesame.",
    ingredients: ["Potato batons", "Wild Honey", "Sesame seeds", "Chili reduction"],
    spicyLevel: 1
  },
  {
    id: "chilly-05",
    name: "Crispy Potato",
    price: 140,
    rating: 4.3,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60",
    description: "Crunchy potato fingers seasoned nicely with toasted salt, white pepper and oriental hints.",
    ingredients: ["Potatoes", "Crushed black pepper", "Spring greens"],
    spicyLevel: 1
  },
  {
    id: "chilly-06",
    name: "Paneer Chilly",
    price: 220,
    rating: 4.8,
    category: "Chilly Specials",
    isVeg: true,
    isPopular: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    description: "Indo-Chinese star dish! Crispy cottage cheese cubes tossed with fiery hot organic bell peppers, white onions and deep soy garlic sauce.",
    ingredients: ["Paneer cubes", "Diced bell pepper", "Dark soy", "Green chili slits"],
    spicyLevel: 3
  },
  {
    id: "chilly-07",
    name: "Paneer 65",
    price: 210,
    rating: 4.7,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    description: "Deep-fried spiced paneer cubes marinated expertly with yogurt, curry leaves, and South-Indian dry spices.",
    ingredients: ["Paneer chunks", "South Indian 65 spice mix", "Curry leaves", "Yogurt starter"],
    spicyLevel: 2
  },
  {
    id: "chilly-08",
    name: "Mushroom Chilly",
    price: 220,
    rating: 4.5,
    category: "Chilly Specials",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Lightly fried fresh button mushrooms dunked in a delicious thick soy chili garlic oriental gravy.",
    ingredients: ["Button mushrooms", "Dark soy", "Spring onion", "Thai bird chillies"],
    spicyLevel: 3
  },
  {
    id: "chilly-09",
    name: "Veg Manchurian",
    price: 180,
    rating: 4.6,
    category: "Chilly Specials",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Crispy fried vegetable balls served in a rich, deeply satisfying, finger-licking savory ginger-garlic soy coriander gravy.",
    ingredients: ["Minced veg balls", "Garlic ginger glaze", "Soy sauce broth", "Coriander"],
    spicyLevel: 2
  },

  // --- NOODLES ---
  {
    id: "node-01",
    name: "Chowmein",
    price: 120,
    rating: 4.4,
    category: "Noodles",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    description: "Full portion wok-tossed street-style noodles mixed with shredded cabbage, carrots, onion and light soy.",
    ingredients: ["Egg-free noodles", "Cabbage carrot juliennes", "Vinegar", "White pepper"],
    spicyLevel: 1
  },
  {
    id: "node-02",
    name: "Paneer Chowmein",
    price: 140,
    rating: 4.7,
    category: "Noodles",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    description: "Classic street chowmein augmented beautifully with fried protein-rich cottage cheese (Paneer) shreds on top.",
    ingredients: ["Fried paneer slivers", "Noodles", "Wok toss vegetable blend"],
    spicyLevel: 1
  },
  {
    id: "node-03",
    name: "Schezwan Noodles",
    price: 140,
    rating: 4.6,
    category: "Noodles",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    description: "Fierce and incredibly flavorful stir-fried noodles tossed with loaded homemade bold Schezwan chili paste.",
    ingredients: ["Noodles", "Bold Schezwan sauce", "Sichuan peppercorn", "Garlic"],
    spicyLevel: 3
  },
  {
    id: "node-04",
    name: "Veg Sizzler",
    price: 200,
    rating: 4.8,
    category: "Noodles",
    isVeg: true,
    isTodaySpecial: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    description: "A premium sizzling platter loaded with soft Hakka noodles, grilled potato wedges, sautéed butter veggies and dry manchurian balls.",
    ingredients: ["Smoking hot skillet", "Hakka noodles", "Manchurian balls", "Sautéed vegetables"],
    spicyLevel: 2
  },
  {
    id: "node-05",
    name: "Veg Mix Noodles",
    price: 160,
    rating: 4.5,
    category: "Noodles",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    description: "Stir fried noodles containing premium chopped baby corn, mushrooms, paneer chunks and fresh vegetables in a delicious blend.",
    ingredients: ["Noodles", "Mushroom", "Baby Corn", "Paneer", "Stir fry soy sauce"],
    spicyLevel: 1
  },

  // --- RICE ---
  {
    id: "rice-01",
    name: "Steam Rice",
    price: 70,
    rating: 4.3,
    category: "Rice",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Fluffy, perfectly boiled royal basmati rice grains.",
    ingredients: ["Aromatic Basmati rice"],
    spicyLevel: 0
  },
  {
    id: "rice-02",
    name: "Jeera Rice",
    price: 100,
    rating: 4.6,
    category: "Rice",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Long grain basmati. Fluffy rice tempered elegantly with roasted ghee and fragrant cumin seeds.",
    ingredients: ["Basmati", "Jeera (Cumin)", "Desi Ghee"],
    spicyLevel: 0
  },
  {
    id: "rice-03",
    name: "Fried Rice",
    price: 130,
    rating: 4.5,
    category: "Rice",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Chinese style high flam wok-fried rice tossed with tiny vegetables, spring onions and light soy hints.",
    ingredients: ["Basmati rice", "Finely minced carrots & beans", "Spring onions", "Sichuan soy sauce"],
    spicyLevel: 1
  },
  {
    id: "rice-04",
    name: "Road Pulao",
    price: 150,
    rating: 4.7,
    category: "Rice",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Bihar roadside luxury standard aromatic Pulao rich with cardamom, dry fruits, saffron hues and roasted onions.",
    ingredients: ["Saffron rice", "Cashews", "Kishmish", "Kewra water aroma", "Ghee"],
    spicyLevel: 1
  },
  {
    id: "rice-05",
    name: "Green Peas Pulao",
    price: 140,
    rating: 4.4,
    category: "Rice",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60",
    description: "Mildly sweet aromatic Basmati rice cooked with buttery green peas, bay leaves, and mild cinnamon strings.",
    ingredients: ["Basmati", "Sweet peas", "Bay leaf", "Cinnamon", "Star anise"],
    spicyLevel: 0
  },

  // --- DAL ---
  {
    id: "dal-01",
    name: "Dal Fry",
    price: 100,
    rating: 4.5,
    category: "Dal",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Smooth yellow lentils cooked with onion, tomatoes, green chillies, garlic and fresh green coriander.",
    ingredients: ["Toor Dal (Arhar)", "Tomato core", "Garlic cloves", "Mustard oil"],
    spicyLevel: 1
  },
  {
    id: "dal-02",
    name: "Yellow Dal Tadka",
    price: 140,
    rating: 4.7,
    category: "Dal",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Satisfying yellow lentils tempered twice! Once with ghee/mustard, second with red dry chilies, garlic, and hing.",
    ingredients: ["Lentils", "Pure Ghee", "Whole dry red chili", "Asafoetida (Hing)", "Cumin seeds"],
    spicyLevel: 2
  },
  {
    id: "dal-03",
    name: "Dal Makhani",
    price: 170,
    rating: 4.9,
    category: "Dal",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Classic luxury! Whole black lentils and red kidney beans slow-cooked overnight over a low wood fire, loaded with butter and cream.",
    ingredients: ["Urad Sabut (Black dal)", "Rajma", "White Butter", "Rich Cream", "Spiced reduction"],
    spicyLevel: 0
  },
  {
    id: "dal-04",
    name: "Black Dal Tadka",
    price: 170,
    rating: 4.6,
    category: "Dal",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    description: "Bold black lentils seasoned nicely and tempered dynamically with spicy garlic, mustard oil and spring onion bits.",
    ingredients: ["Black lentils", "Ginger threads", "Double garlic tadka", "Ghee"],
    spicyLevel: 2
  },

  // --- ROTI & NAAN ---
  {
    id: "roti-01",
    name: "Tandoori Roti",
    price: 15,
    rating: 4.3,
    category: "Roti & Naan",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Traditional whole-wheat Indian bread baked standard in our clay tandoor.",
    ingredients: ["Whole wheat flour"],
    spicyLevel: 0
  },
  {
    id: "roti-02",
    name: "Butter Tandoori Roti",
    price: 20,
    rating: 4.6,
    category: "Roti & Naan",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Clay-baked whole wheat roti brushed liberally with melting pure butter.",
    ingredients: ["Whole wheat flour", "Butter"],
    spicyLevel: 0
  },
  {
    id: "roti-03",
    name: "Plain Naan",
    price: 35,
    rating: 4.4,
    category: "Roti & Naan",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Soft and fluffy refined flour flatbread baked over high flame inside the clay tandoor.",
    ingredients: ["Refined flour (Maida)", "Milk secrets"],
    spicyLevel: 0
  },
  {
    id: "roti-04",
    name: "Butter Naan",
    price: 45,
    rating: 4.8,
    category: "Roti & Naan",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Multilayered fluffy tandoori bread glazed beautifully with butter.",
    ingredients: ["Maida dough", "Pure melted butter coating"],
    spicyLevel: 0
  },
  {
    id: "roti-05",
    name: "Garlic Naan",
    price: 60,
    rating: 4.8,
    category: "Roti & Naan",
    isVeg: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Soft butter naan generously topped with roasted minced garlic, coriander sprigs and black nigella seeds.",
    ingredients: ["Refined flour", "Minced roasted garlic", "Butter", "Nigella seeds"],
    spicyLevel: 0
  },
  {
    id: "roti-06",
    name: "Kulcha",
    price: 60,
    rating: 4.5,
    category: "Roti & Naan",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Soft flatbread filled lightly with spiced mashed potato and onion crumbs, baked beautifully.",
    ingredients: ["Maida", "Potato spice dust", "Coriander topping"],
    spicyLevel: 1
  },
  {
    id: "roti-07",
    name: "Cheese Naan",
    price: 80,
    rating: 4.9,
    category: "Roti & Naan",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "Decadent Indian bread stuffed oozing with rich melted processed cheese, butter glazed.",
    ingredients: ["Maida", "Amul cheese filling", "Butter finish"],
    spicyLevel: 0
  }
];

export const CATEGORIES = [
  "All",
  "Vegetables",
  "Special Thali",
  "Tandoor Se",
  "Appetizers",
  "Soup",
  "Beverages",
  "Momos",
  "Chilly Specials",
  "Noodles",
  "Rice",
  "Dal",
  "Roti & Naan"
];

export const OFFERS: Offer[] = [
  {
    id: "off-01",
    code: "BAWARCHI50",
    discountPercent: 15,
    title: "15% Welcome Discount",
    description: "Enjoy a royal 15% discount on orders above ₹300.",
    minAmount: 300,
    image: "/src/assets/images/spicy_bawarchi_banner_1780188565194.png"
  },
  {
    id: "off-02",
    code: "FEAST20",
    discountPercent: 20,
    title: "Grand Party Feast",
    description: "Flat 20% discount on massive family orders above ₹1000.",
    minAmount: 1000,
    image: "/src/assets/images/spicy_bawarchi_banner_1780188565194.png"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-01",
    name: "Rana Kumar Rathore",
    rating: 5,
    comment: "Spicy Bawarchi's Special Thali is an absolute masterpiece! The Paneer Butter Masala and Dal Makhani tasted incredibly authentic. Highly recommended in Forbesganj!",
    date: "2026-05-28",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    dishName: "Special Thali"
  },
  {
    id: "rev-02",
    name: "Aman Gupta",
    rating: 5,
    comment: "The Jhol Momo and Sizzler Momos have my heart. Extremely rich sesame broth and flawless presentation. Hits the spot! The mobile checkout using Whatsapp is super smooth.",
    date: "2026-05-25",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    dishName: "Jhol Momo"
  },
  {
    id: "rev-03",
    name: "Pooja Sharma",
    rating: 4.8,
    comment: "I booked my daughter's birthday party function here. High degree of cleanliness, grand hospitality, and super amazing food (Tawa Veg & Cheese Naan are cosmic level).",
    date: "2026-05-20",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    dishName: "Tawa Veg"
  },
  {
    id: "rev-04",
    name: "Vikash Kumar",
    rating: 5,
    comment: "Simply the best Paneer Tikka Masala in Bihar. The clay tandoor flavor is real. Awesome dark luxurious ambiance! Worthy of five solid stars.",
    date: "2026-05-18",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    dishName: "Paneer Tikka Masala"
  }
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
];
