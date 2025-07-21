
export interface HindiCharacter {
  character: string;
  word: string;
  hint: string;
  type: 'vowel' | 'consonant';
}

export interface HindiTransliteratedCharacter {
  display: string; // e.g., "a = अ"
  pronunciation: string; // e.g., "a", "double a", "k"
  hindi: string; // e.g., "अ"
}


export const hindiVowels: HindiCharacter[] = [
  { character: 'अ', word: 'anar', hint: 'red fruit', type: 'vowel'},
  { character: 'आ', word: 'aam', hint: 'king of fruits', type: 'vowel'},
  { character: 'इ', word: 'imli', hint: 'sour tamarind', type: 'vowel'},
  { character: 'ई', word: 'eekh', hint: 'sweet sugarcane', type: 'vowel'},
  { character: 'उ', word: 'ullu', hint: 'night bird', type: 'vowel'},
  { character: 'ऊ', word: 'oon', hint: 'soft wool', type: 'vowel'},
  { character: 'ऋ', word: 'rishi', hint: 'wise sage', type: 'vowel'},
  { character: 'ए', word: 'edi', hint: 'body part heel', type: 'vowel'},
  { character: 'ऐ', word: 'ainak', hint: 'spectacles', type: 'vowel'},
  { character: 'ओ', word: 'okhli', hint: 'mortar', type: 'vowel'},
  { character: 'औ', word: 'aurat', hint: 'woman', type: 'vowel'},
  { character: 'अं', word: 'angoor', hint: 'grapes', type: 'vowel'},
  { character: 'अः', word: 'namah', hint: 'a greeting', type: 'vowel'},
];

export const hindiConsonants: HindiCharacter[] = [
  { character: 'क', word: 'kamal', hint: 'lotus flower', type: 'consonant' },
  { character: 'ख', word: 'khargosh', hint: 'rabbit', type: 'consonant' },
  { character: 'ग', word: 'gamla', hint: 'flower pot', type: 'consonant' },
  { character: 'घ', word: 'ghar', hint: 'house', type: 'consonant' },
  { character: 'च', word: 'chammach', hint: 'spoon', type: 'consonant' },
  { character: 'छ', word: 'chhatri', hint: 'umbrella', type: 'consonant' },
  { character: 'ज', word: 'jahaj', hint: 'ship', type: 'consonant' },
  { character: 'झ', word: 'jhanda', hint: 'flag', type: 'consonant' },
  { character: 'ट', word: 'tamatar', hint: 'tomato', type: 'consonant' },
  { character: 'ठ', word: 'thathera', hint: 'tinsmith', type: 'consonant' },
  { character: 'ड', word: 'damroo', hint: 'small drum', type: 'consonant' },
  { character: 'ढ', word: 'dhakkan', hint: 'lid', type: 'consonant' },
  { character: 'त', word: 'tarbooj', hint: 'watermelon', type: 'consonant' },
  { character: 'थ', word: 'tharmas', hint: 'thermos', type: 'consonant' },
  { character: 'द', word: 'davaat', hint: 'inkpot', type: 'consonant' },
  { character: 'ध', word: 'dhanush', hint: 'bow', type: 'consonant' },
  { character: 'न', word: 'nal', hint: 'tap', type: 'consonant' },
  { character: 'प', word: 'patang', hint: 'kite', type: 'consonant' },
  { character: 'फ', word: 'phal', hint: 'fruits', type: 'consonant' },
  { character: 'ब', word: 'bakri', hint: 'goat', type: 'consonant' },
  { character: 'भ', word: 'bhalu', hint: 'bear', type: 'consonant' },
  { character: 'म', word: 'machhli', hint: 'fish', type: 'consonant' },
  { character: 'य', word: 'yagya', hint: 'ritual', type: 'consonant' },
  { character: 'र', word: 'rath', hint: 'chariot', type: 'consonant' },
  { character: 'ल', word: 'lattu', hint: 'spinning top', type: 'consonant' },
  { character: 'व', word: 'vak', hint: 'crane', type: 'consonant' },
  { character: 'श', word: 'shalgam', hint: 'turnip', type: 'consonant' },
  { character: 'ष', word: 'shatkon', hint: 'hexagon', type: 'consonant' },
  { character: 'स', word: 'sapera', hint: 'snake charmer', type: 'consonant' },
  { character: 'ह', word: 'hathi', hint: 'elephant', type: 'consonant' },
  { character: 'क्ष', word: 'kshatriya', hint: 'warrior', type: 'consonant' },
  { character: 'त्र', word: 'trishool', hint: 'trident', type: 'consonant' },
  { character: 'ज्ञ', word: 'gyani', hint: 'knowledgeable person', type: 'consonant' },
];

export const hindiCharacters: HindiCharacter[] = [...hindiVowels, ...hindiConsonants];

export const hindiTransliteratedCharacters: HindiTransliteratedCharacter[] = [
  { display: 'a = अ', pronunciation: 'ey', hindi: 'अ' },
  { display: 'aa = आ', pronunciation: 'double a', hindi: 'आ' },
  { display: 'i = इ', pronunciation: 'i', hindi: 'इ' },
  { display: 'ee = ई', pronunciation: 'double ee', hindi: 'ई' },
  { display: 'u = उ', pronunciation: 'you', hindi: 'उ' },
  { display: 'oo = ऊ', pronunciation: 'double o', hindi: 'ऊ' },
  { display: 'ri = ऋ', pronunciation: 'r i', hindi: 'ऋ' },
  { display: 'e = ए', pronunciation: 'e', hindi: 'ए' },
  { display: 'ai = ऐ', pronunciation: 'a i', hindi: 'ऐ' },
  { display: 'o = ओ', pronunciation: 'oh', hindi: 'ओ' },
  { display: 'au = औ', pronunciation: 'a u', hindi: 'औ' },
  { display: 'an = अं', pronunciation: 'a n', hindi: 'अं' },
  { display: 'ah = अः', pronunciation: 'a h', hindi: 'अः' },
  { display: 'k = क', pronunciation: 'kay', hindi: 'क' },
  { display: 'kh = ख', pronunciation: 'k h', hindi: 'ख' },
  { display: 'g = ग', pronunciation: 'jee', hindi: 'ग' },
  { display: 'gh = घ', pronunciation: 'g h', hindi: 'घ' },
  { display: 'ch = च', pronunciation: 'c h', hindi: 'च' },
  { display: 'chh = छ', pronunciation: 'c double h', hindi: 'छ' },
  { display: 'j = ज', pronunciation: 'jay', hindi: 'ज' },
  { display: 'jh = झ', pronunciation: 'j h', hindi: 'झ' },
  { display: 't = ट', pronunciation: 'tee', hindi: 'ट' },
  { display: 'th = ठ', pronunciation: 't h', hindi: 'ठ' },
  { display: 'd = ड', pronunciation: 'dee', hindi: 'ड' },
  { display: 'dh = ढ', pronunciation: 'd h', hindi: 'ढ' },
  { display: 't = त', pronunciation: 'tee', hindi: 'त' },
  { display: 'th = थ', pronunciation: 't h', hindi: 'थ' },
  { display: 'd = द', pronunciation: 'dee', hindi: 'द' },
  { display: 'dh = ध', pronunciation: 'd h', hindi: 'ध' },
  { display: 'n = न', pronunciation: 'en', hindi: 'न' },
  { display: 'p = प', pronunciation: 'pee', hindi: 'प' },
  { display: 'ph = फ', pronunciation: 'p h', hindi: 'फ' },
  { display: 'b = ब', pronunciation: 'bee', hindi: 'ब' },
  { display: 'bh = भ', pronunciation: 'b h', hindi: 'भ' },
  { display: 'm = म', pronunciation: 'em', hindi: 'म' },
  { display: 'y = य', pronunciation: 'why', hindi: 'य' },
  { display: 'r = र', pronunciation: 'aar', hindi: 'र' },
  { display: 'l = ल', pronunciation: 'el', hindi: 'ल' },
  { display: 'v = व', pronunciation: 'vee', hindi: 'व' },
  { display: 'sh = श', pronunciation: 's h se taalavya sha', hindi: 'श' },
  { display: 'sh = ष', pronunciation: 's h se moordhanya sha', hindi: 'ष' },
  { display: 's = स', pronunciation: 's se dantya sa', hindi: 'स' },
  { display: 'h = ह', pronunciation: 'aitch', hindi: 'ह' },
  { display: 'ksh = क्ष', pronunciation: 'k s h', hindi: 'क्ष' },
  { display: 'tr = त्र', pronunciation: 't r', hindi: 'त्र' },
  { display: 'gy = ज्ञ', pronunciation: 'g y', hindi: 'ज्ञ' },
];

    
