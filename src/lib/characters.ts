
export interface AlphabetCharacter {
  letter: string;
  word: string;
  hint: string;
  story: string;
  meaningHi: string;
}

export interface ShapeCharacter {
  name: string;
  path: string;
  viewBox: string;
}

export interface Poem {
  title: string;
  author: string;
  lines: string[];
}

export const numbers: string[] = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

export const alphabet: AlphabetCharacter[] = [
  { letter: 'A', word: 'Apple', hint: 'red apple', story: 'A shiny Apple, red and round,\nThe tastiest treat I\'ve ever found!', meaningHi: 'Seb' },
  { letter: 'B', word: 'Ball', hint: 'bouncy ball', story: 'A bouncy Ball, so big and bright,\nLoves to jump with all its might!', meaningHi: 'Gend' },
  { letter: 'C', word: 'Cat', hint: 'cute cat', story: 'A cozy Cat, with a purr so sweet,\nNaps in sunbeams, on tired little feet.', meaningHi: 'Billi' },
  { letter: 'D', word: 'Dog', hint: 'friendly dog', story: 'A happy Dog, with a wagging tail,\nBarks "hello!" on the garden trail.', meaningHi: 'Kutta' },
  { letter: 'E', word: 'Egg', hint: 'white egg', story: 'A little Egg, so smooth and white,\nHolds a sleepy baby bird inside!', meaningHi: 'Anda' },
  { letter: 'F', word: 'Fish', hint: 'swimming fish', story: 'A tiny Fish, with a "swish" and "swoosh",\nBlows bubbly kisses from a seaweed bush.', meaningHi: 'Machhli' },
  { letter: 'G', word: 'Goat', hint: 'farm goat', story: 'A silly Goat, with a fuzzy chin,\nEats pajamas, what a grin!', meaningHi: 'Bakri' },
  { letter: 'H', word: 'Hat', hint: 'sun hat', story: 'A floppy Hat, for a sunny day,\nKeeps the happy sunbeams far away.', meaningHi: 'Topi' },
  { letter: 'I', word: 'Igloo', hint: 'snow igloo', story: 'An icy Igloo, round and grand,\nThe coolest little house in all the land!', meaningHi: 'Baraf ka ghar' },
  { letter: 'J', word: 'Jar', hint: 'jam jar', story: 'A sticky Jar, of strawberry jam,\n"Yummy in my tummy!" thank you, ma\'am!', meaningHi: 'Martbaan' },
  { letter: 'K', word: 'Kite', hint: 'flying kite', story: 'A dancing Kite, on a string so long,\nSings to the clouds a windy song.', meaningHi: 'Patang' },
  { letter: 'L', word: 'Lion', hint: 'roaring lion', story: 'A mighty Lion, with a giant ROAR,\nShakes the jungle floor and asks for more!', meaningHi: 'Sher' },
  { letter: 'M', word: 'Monkey', hint: 'swinging monkey', story: 'A cheeky Monkey, full of glee,\nSwings by his tail from tree to tree!', meaningHi: 'Bandar' },
  { letter: 'N', word: 'Nest', hint: 'bird nest', story: 'A cozy Nest, made of twigs and string,\nWhere the baby bluebirds learn to sing.', meaningHi: 'Ghosla' },
  { letter: 'O', word: 'Orange', hint: 'orange fruit', story: 'A juicy Orange, a sweet surprise,\nA little ball of sunshine for your eyes!', meaningHi: 'Santra' },
  { letter: 'P', word: 'Pencil', hint: 'yellow pencil', story: 'A pointy Pencil, sharp and new,\nDraws magical worlds for me and you.', meaningHi: 'Kalam' },
  { letter: 'Q', word: 'Queen', hint: 'royal queen', story: 'A lovely Queen, with a sparkly crown,\nIs the kindest person in the town.', meaningHi: 'Rani' },
  { letter: 'R', word: 'Rabbit', hint: 'hopping rabbit', story: 'A fluffy Rabbit, with a twitchy nose,\nHops through the flowers, on its tippy-toes.', meaningHi: 'Khargosh' },
  { letter: 'S', word: 'Sun', hint: 'bright sun', story: 'The happy Sun, with a golden face,\nWakes the world with a warm embrace.', meaningHi: 'Suraj' },
  { letter: 'T', word: 'Tiger', hint: 'striped tiger', story: 'A stripy Tiger, orange and black,\nLoves to sneak and pounce for a snack!', meaningHi: 'Bagh' },
  { letter: 'U', word: 'Urn', hint: 'clay urn', story: 'A sturdy Urn, a pot so grand,\nCrafted with care by a skillful hand.', meaningHi: 'Kalash' },
  { letter: 'V', word: 'Violin', hint: 'musical violin', story: 'A little Violin, sings a tune so sweet,\nMakes you want to dance with your happy feet.', meaningHi: 'Sarangi' },
  { letter: 'W', word: 'Watch', hint: 'wrist watch', story: 'A ticking Watch, goes "tick-tock-tick",\nTime for fun, be quick, be quick!', meaningHi: 'Ghadi' },
  { letter: 'X', word: 'X-ray', hint: 'bone x-ray', story: 'An X-ray shows, with a magic flash,\nThe bones inside you in a dash!', meaningHi: 'X-ray' },
  { letter: 'Y', word: 'Yacht', hint: 'sailing yacht', story: 'A sailing Yacht, on the ocean blue,\n"Adventure calls!" for me and you.', meaningHi: 'Naav' },
  { letter: 'Z', word: 'Zebra', hint: 'striped zebra', story: 'A dizzy Zebra, black and white,\nIs a walking, talking, stripy sight!', meaningHi: 'Zebra' },
];

export const shapes: ShapeCharacter[] = [
    { name: 'Circle', path: 'M 250, 250 m -200, 0 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0', viewBox: '0 0 500 500' },
    { name: 'Square', path: 'M 50,50 L 450,50 L 450,450 L 50,450 Z', viewBox: '0 0 500 500' },
    { name: 'Triangle', path: 'M 250,50 L 450,450 L 50,450 Z', viewBox: '0 0 500 500' },
    { name: 'Heart', path: 'M250,150 C 100,0 0,100 0,250 C 0,400 250,500 250,500 C 250,500 500,400 500,250 C 500,100 400,0 250,150 Z', viewBox: '-25 -25 550 550' },
    { name: 'Star', path: 'M250,25 L310,180 L480,180 L345,290 L400,450 L250,350 L100,450 L155,290 L20,180 L190,180 Z', viewBox: '0 0 500 500' },
    { name: 'Sun', path: 'M250,150 a100,100 0 1,0 0,200 a100,100 0 1,0 0,-200 M250,50 v50 m0,250 v50 m-125,-125 h50 m200,0 h50 m-200,-75 l35,-35 m-70,140 l35,-35 m-35,-70 l35,35 m-70,-140 l35,35', viewBox: '0 0 500 500'},
    { name: 'Flower', path: 'M250,250 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0 M250,150 c50,0 50,100 0,100 c-50,0 -50,-100 0,-100 M350,250 c0,50 -100,50 -100,0 c0,-50 100,-50 100,0 M250,350 c-50,0 -50,-100 0,-100 c50,0 50,100 0,100 M150,250 c0,-50 100,-50 100,0 c0,50 -100,50 -100,0', viewBox: '0 0 500 500' },
    { name: 'Book', path: 'M100,50 L100,450 L400,450 L400,50 L100,50 M250,50 L250,450 M100,60 L240,60 M100,90 L240,90 M260,60 L400,60 M260,90 L400,90', viewBox: '0 0 500 500'},
    { name: 'Tree', path: 'M250,450 L250,300 M250,300 C150,300 150,150 250,150 C350,150 350,300 250,300 M200,250 C100,250 100,100 200,100 C300,100 300,250 200,250 M300,250 C200,250 200,100 300,100 C400,100 400,250 300,250', viewBox: '0 0 500 500'},
    { name: 'Rectangle', path: 'M 50,100 L 450,100 L 450,400 L 50,400 Z', viewBox: '0 0 500 500' },
    { name: 'Oval', path: 'M 250, 250 m -200, 0 a 200,125 0 1,0 400,0 a 200,125 0 1,0 -400,0', viewBox: '0 0 500 500' },
    { name: 'Diamond', path: 'M 250,25 L 475,250 L 250,475 L 25,250 Z', viewBox: '0 0 500 500'},
    { name: 'Pentagon', path: 'M250,25 L475,185 L390,450 L110,450 L25,185 Z', viewBox: '0 0 500 500'},
    { name: 'Cat', path: 'M150,150 C150,100 250,100 250,150 C300,100 400,100 400,150 C450,200 400,350 275,350 C150,350 100,200 150,150 Z M175,125 A 25 25 0 0 1 125 125 Z M375,125 A 25 25 0 0 1 325 125 Z', viewBox: '50 50 450 450' },
    { name: 'Fish', path: 'M100,250 C100,150 250,150 350,250 C250,350 100,350 100,250 Z M350,250 L450,150 L450,350 Z', viewBox: '50 50 450 450'},
    { name: 'House', path: 'M50,250 L50,450 L450,450 L450,250 L250,50 Z M150,300 L150,450 L250,450 L250,300 Z', viewBox: '0 0 500 500' },
    { name: 'Car', path: 'M100,350 L400,350 L450,250 L350,250 L300,150 L150,150 L100,250 Z M150,400 a50,50 0 1,0 0,-0.1 M350,400 a50,50 0 1,0 0,-0.1', viewBox: '0 0 500 500' },
];


export const readingWords: { word: string }[] = [
    { word: 'CAT' },
    { word: 'SUN' },
    { word: 'DOG' },
    { word: 'BALL' },
    { word: 'TREE' },
    { word: 'CAR' },
    { word: 'BOOK' },
    { word: 'STAR' },
];

export const englishPoems: Poem[] = [
  {
    title: "Twinkle, Twinkle, Little Star",
    author: "Jane Taylor",
    lines: [
      "Twinkle, twinkle, little star,",
      "How I wonder what you are!",
      "Up above the world so high,",
      "Like a diamond in the sky."
    ]
  },
  {
    title: "Baa, Baa, Black Sheep",
    author: "Traditional",
    lines: [
      "Baa, baa, black sheep,",
      "Have you any wool?",
      "Yes, sir, yes, sir,",
      "Three bags full."
    ]
  },
  {
    title: "Jack and Jill",
    author: "Traditional",
    lines: [
      "Jack and Jill went up the hill",
      "To fetch a pail of water;",
      "Jack fell down and broke his crown,",
      "And Jill came tumbling after."
    ]
  },
  {
    title: "Humpty Dumpty",
    author: "Traditional",
    lines: [
      "Humpty Dumpty sat on a wall,",
      "Humpty Dumpty had a great fall.",
      "All the king's horses and all the king's men",
      "Couldn't put Humpty together again."
    ]
  },
  {
    title: "Mary Had a Little Lamb",
    author: "Sarah Josepha Hale",
    lines: [
      "Mary had a little lamb,",
      "Its fleece was white as snow;",
      "And everywhere that Mary went,",
      "The lamb was sure to go."
    ]
  },
  {
    title: "Row, Row, Row Your Boat",
    author: "Traditional",
    lines: [
      "Row, row, row your boat,",
      "Gently down the stream.",
      "Merrily, merrily, merrily, merrily,",
      "Life is but a dream."
    ]
  },
  {
    title: "The Itsy Bitsy Spider",
    author: "Traditional",
    lines: [
      "The itsy bitsy spider",
      "Climbed up the waterspout.",
      "Down came the rain",
      "And washed the spider out."
    ]
  },
  {
    title: "One, Two, Buckle My Shoe",
    author: "Traditional",
    lines: [
      "One, two,",
      "Buckle my shoe;",
      "Three, four,",
      "Knock at the door."
    ]
  },
  {
    title: "Hickory Dickory Dock",
    author: "Traditional",
    lines: [
      "Hickory dickory dock,",
      "The mouse ran up the clock.",
      "The clock struck one,",
      "The mouse ran down,",
      "Hickory dickory dock."
    ]
  },
  {
    title: "Little Bo-Peep",
    author: "Traditional",
    lines: [
      "Little Bo-Peep has lost her sheep,",
      "And doesn't know where to find them;",
      "Leave them alone, and they'll come home,",
      "Wagging their tails behind them."
    ]
  },
  {
    title: "Hey Diddle Diddle",
    author: "Traditional",
    lines: [
      "Hey diddle diddle,",
      "The cat and the fiddle,",
      "The cow jumped over the moon;",
      "The little dog laughed",
      "To see such sport,",
      "And the dish ran away with the spoon."
    ]
  },
  {
    title: "Rain, Rain, Go Away",
    author: "Traditional",
    lines: [
      "Rain, rain, go away,",
      "Come again another day;",
      "Little Johnny wants to play.",
      "Rain, rain, go away."
    ]
  },
  {
    title: "I'm a Little Teapot",
    author: "George Harold Sanders",
    lines: [
      "I'm a little teapot,",
      "Short and stout,",
      "Here is my handle,",
      "Here is my spout."
    ]
  },
  {
    title: "Teddy Bear, Teddy Bear",
    author: "Traditional",
    lines: [
      "Teddy bear, teddy bear, turn around,",
      "Teddy bear, teddy bear, touch the ground,",
      "Teddy bear, teddy bear, show your shoe,",
      "Teddy bear, teddy bear, that will do."
    ]
  },
  {
    title: "Little Miss Muffet",
    author: "Traditional",
    lines: [
      "Little Miss Muffet",
      "Sat on a tuffet,",
      "Eating her curds and whey;",
      "Along came a spider,",
      "Who sat down beside her",
      "And frightened Miss Muffet away."
    ]
  },
  {
    title: "Old MacDonald Had a Farm",
    author: "Traditional",
    lines: [
      "Old MacDonald had a farm,",
      "E-I-E-I-O.",
      "And on that farm he had a cow,",
      "E-I-E-I-O."
    ]
  }
];

export const hindiKabitas: Poem[] = [
  {
    title: "मछली जल की रानी है",
    author: "पारंपरिक",
    lines: [
      "मछली जल की रानी है,",
      "जीवन उसका पानी है।",
      "हाथ लगाओ तो डर जाएगी,",
      "बाहर निकालो तो मर जाएगी।"
    ]
  },
  {
    title: "आलू कचालू बेटा",
    author: "पारंपरिक",
    lines: [
      "आलू कचालू बेटा कहाँ गए थे,",
      "बन्दर की झोपड़ी में सो रहे थे।",
      "बन्दर ने लात मारी रो रहे थे,",
      "मम्मी ने प्यार किया हँस रहे थे।"
    ]
  },
  {
    title: "चंदा मामा दूर के",
    author: "पारंपरिक",
    lines: [
      "चंदा मामा दूर के,",
      "पुए पकाएं बूर के।",
      "आप खाएं थाली में,",
      "मुन्ने को दें प्याली में।"
    ]
  },
  {
    title: "तितली उड़ी, बस में चढ़ी",
    author: "पारंपरिक",
    lines: [
      "तितली उड़ी, बस में चढ़ी,",
      "सीट न मिली तो रोने लगी।",
      "ड्राइवर ने बोला आजा मेरे पास,",
      "तितली बोली हट बदमाश।"
    ]
  },
  {
    title: "नानी तेरी मोरनी",
    author: "पारंपरिक",
    lines: [
      "नानी तेरी मोरनी को मोर ले गए,",
      "बाकी जो बचा था काले चोर ले गए।",
      "खाके पीके मोटे होके चोर बैठे रेल में,",
      "चोरों वाला डब्बा कट के पहुँचा सीधा जेल में।"
    ]
  },
  {
    title: "लाला जी ने केला खाया",
    author: "पारंपरिक",
    lines: [
      "लाला जी ने केला खाया,",
      "केला खा कर मुँह पिचकाया।",
      "मुँह पिचका कर तोंद फुलाई,",
      "तोंद फुला कर कदम बढ़ाया।"
    ]
  },
  {
    title: "हाथी राजा कहाँ चले",
    author: "पारंपरिक",
    lines: [
      "हाथी राजा कहाँ चले,",
      "सूँड हिलाकर कहाँ चले।",
      "मेरे घर भी आओ ना,",
      "हलवा पूरी खाओ ना।"
    ]
  },
  {
    title: "ऊपर पंखा चलता है",
    author: "पारंपरिक",
    lines: [
      "ऊपर पंखा चलता है,",
      "नीचे बेबी सोता है।",
      "सोते सोते भूख लगी,",
      "खा ले बेटा मूँगफली।"
    ]
  },
  {
    title: "चू चू करती आई चिड़िया",
    author: "पारंपरिक",
    lines: [
      "चू चू करती आई चिड़िया,",
      "दाल का दाना लाई चिड़िया।",
      "मोर भी आया, कौआ भी आया,",
      "बंदर भी आया, लंगूर भी आया।"
    ]
  },
  {
    title: "लकड़ी की काठी",
    author: "पारंपरिक",
    lines: [
      "लकड़ी की काठी, काठी पे घोड़ा,",
      "घोड़े की दुम पे जो मारा हथौड़ा।",
      "दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा।"
    ]
  },
  {
    title: "चुहिया रानी",
    author: "पारंपरिक",
    lines: [
      "चुहिया रानी, चुहिया रानी,",
      "लगती हो तुम बड़ी सयानी।",
      "जैसे हो इस घर की रानी,",
      "कभी तो पीती दूध मलाई।"
    ]
  },
  {
    title: "एक मोटा हाथी",
    author: "पारंपरिक",
    lines: [
      "एक मोटा हाथी, झूम के चला,",
      "मकड़ी के जाल में, जा के वो फँसा।",
      "जाल को देखा, देख के डरा,",
      "दूसरे हाथी को इशारे से बुलाया।"
    ]
  },
  {
    title: "बिल्ली मौसी",
    author: "पारंपरिक",
    lines: [
      "बिल्ली मौसी, बिल्ली मौसी,",
      "कहो कहाँ से आई हो।",
      "कितने चूहे मारे तुमने,",
      "कितने खाकर आई हो।"
    ]
  },
  {
    title: "गरम समोसे",
    author: "पारंपरिक",
    lines: [
      "देखो देखो कालू मदारी आया,",
      "कालू मदारी आया।",
      "साथ में अपने भालू लाया,",
      "साथ में अपने भालू लाया।"
    ]
  },
  {
    title: "धोबी आया",
    author: "पारंपरिक",
    lines: [
      "धोबी आया, धोबी आया,",
      "कितने कपड़े लाया।",
      "एक, दो, तीन,",
      "भाई एक, दो, तीन।"
    ]
  },
  {
    title: "गोल गोल पानी",
    author: "पारंपरिक",
    lines: [
      "मम्मी की रोटी गोल गोल,",
      "पापा का पैसा गोल गोल।",
      "दादा का चश्मा गोल गोल,",
      "हम भी गोल, तुम भी गोल, सारी दुनिया गोल मटोल।"
    ]
  }
];

    