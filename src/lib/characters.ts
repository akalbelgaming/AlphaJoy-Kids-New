export interface AlphabetCharacter {
  letter: string;
  word: string;
  hint: string;
}

export interface ShapeCharacter {
  shape: string;
  hint: string;
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
    { shape: 'Circle', hint: 'circle' },
    { shape: 'Square', hint: 'square' },
    { shape: 'Triangle', hint: 'triangle' },
    { shape: 'Star', hint: 'star' },
    { shape: 'Heart', hint: 'heart' },
    { shape: 'Rectangle', hint: 'rectangle' },
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
