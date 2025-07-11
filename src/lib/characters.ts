export interface AlphabetCharacter {
  letter: string;
  word: string;
  hint: string;
}

export interface ShapeCharacter {
  name: string;
  path: string;
  viewBox: string;
}

export const numbers: string[] = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export const alphabet: AlphabetCharacter[] = [
  { letter: 'A', word: 'Apple', hint: 'apple' },
  { letter: 'B', word: 'Ball', hint: 'ball' },
  { letter: 'C', word: 'Cat', hint: 'cat' },
  { letter: 'D', word: 'Dog', hint: 'dog' },
  { letter: 'E', word: 'Elephant', hint: 'elephant' },
  { letter: 'F', word: 'Fish', hint: 'fish' },
  { letter: 'G', word: 'Goat', hint: 'goat' },
  { letter: 'H', word: 'Hat', hint: 'hat' },
  { letter: 'I', word: 'Igloo', hint: 'igloo' },
  { letter: 'J', word: 'Jar', hint: 'jar' },
  { letter: 'K', word: 'Kite', hint: 'kite' },
  { letter: 'L', word: 'Lion', hint: 'lion' },
  { letter: 'M', word: 'Monkey', hint: 'monkey' },
  { letter: 'N', word: 'Nest', hint: 'nest' },
  { letter: 'O', word: 'Orange', hint: 'orange fruit' },
  { letter: 'P', word: 'Pencil', hint: 'pencil' },
  { letter: 'Q', word: 'Queen', hint: 'queen' },
  { letter: 'R', word: 'Rabbit', hint: 'rabbit' },
  { letter: 'S', word: 'Sun', hint: 'sun' },
  { letter: 'T', word: 'Tiger', hint: 'tiger' },
  { letter: 'U', word: 'Umbrella', hint: 'umbrella' },
  { letter: 'V', word: 'Violin', hint: 'violin' },
  { letter: 'W', word: 'Watch', hint: 'watch' },
  { letter: 'X', word: 'Xylophone', hint: 'xylophone' },
  { letter: 'Y', word: 'Yacht', hint: 'yacht' },
  { letter: 'Z', word: 'Zebra', hint: 'zebra' },
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
