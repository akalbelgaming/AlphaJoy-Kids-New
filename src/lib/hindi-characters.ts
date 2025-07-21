export interface HindiCharacter {
  character: string;
  word: string;
  hint: string;
  type: 'vowel' | 'consonant';
  pronunciation: string;
}

export const hindiVowels: HindiCharacter[] = [
  { character: 'अ', word: 'anar', hint: 'red fruit', type: 'vowel', pronunciation: 'a' },
  { character: 'आ', word: 'aam', hint: 'king of fruits', type: 'vowel', pronunciation: 'aa' },
  { character: 'इ', word: 'imli', hint: 'sour tamarind', type: 'vowel', pronunciation: 'i' },
  { character: 'ई', word: 'eekh', hint: 'sweet sugarcane', type: 'vowel', pronunciation: 'ee' },
  { character: 'उ', word: 'ullu', hint: 'night bird', type: 'vowel', pronunciation: 'u' },
  { character: 'ऊ', word: 'oon', hint: 'soft wool', type: 'vowel', pronunciation: 'oo' },
  { character: 'ऋ', word: 'rishi', hint: 'wise sage', type: 'vowel', pronunciation: 'ri' },
  { character: 'ए', word: 'edi', hint: 'body part heel', type: 'vowel', pronunciation: 'e' },
  { character: 'ऐ', word: 'ainak', hint: 'spectacles', type: 'vowel', pronunciation: 'ai' },
  { character: 'ओ', word: 'okhli', hint: 'mortar', type: 'vowel', pronunciation: 'o' },
  { character: 'औ', word: 'aurat', hint: 'woman', type: 'vowel', pronunciation: 'au' },
  { character: 'अं', word: 'angoor', hint: 'grapes', type: 'vowel', pronunciation: 'an' },
  { character: 'अः', word: 'namah', hint: 'a greeting', type: 'vowel', pronunciation: 'ah' },
];

export const hindiTransliteratedVowels: HindiCharacter[] = [
  { character: 'a = अ', word: 'anar', hint: 'red fruit', type: 'vowel', pronunciation: 'a' },
  { character: 'aa = आ', word: 'aam', hint: 'king of fruits', type: 'vowel', pronunciation: 'aa' },
  { character: 'i = इ', word: 'imli', hint: 'sour tamarind', type: 'vowel', pronunciation: 'i' },
  { character: 'ee = ई', word: 'eekh', hint: 'sweet sugarcane', type: 'vowel', pronunciation: 'ee' },
  { character: 'u = उ', word: 'ullu', hint: 'night bird', type: 'vowel', pronunciation: 'u' },
  { character: 'oo = ऊ', word: 'oon', hint: 'soft wool', type: 'vowel', pronunciation: 'oo' },
  { character: 'ri = ऋ', word: 'rishi', hint: 'wise sage', type: 'vowel', pronunciation: 'ri' },
  { character: 'e = ए', word: 'edi', hint: 'body part heel', type: 'vowel', pronunciation: 'e' },
  { character: 'ai = ऐ', word: 'ainak', hint: 'spectacles', type: 'vowel', pronunciation: 'ai' },
  { character: 'o = ओ', word: 'okhli', hint: 'mortar', type: 'vowel', pronunciation: 'o' },
  { character: 'au = औ', word: 'aurat', hint: 'woman', type: 'vowel', pronunciation: 'au' },
  { character: 'an = अं', word: 'angoor', hint: 'grapes', type: 'vowel', pronunciation: 'an' },
  { character: 'ah = अः', word: 'namah', hint: 'a greeting', type: 'vowel', pronunciation: 'ah' },
];

export const hindiConsonants: HindiCharacter[] = [
  { character: 'क', word: 'कमल', hint: 'lotus flower', type: 'consonant', pronunciation: 'k' },
  { character: 'ख', word: 'खरगोश', hint: 'rabbit', type: 'consonant', pronunciation: 'kh' },
  { character: 'ग', word: 'गमला', hint: 'flower pot', type: 'consonant', pronunciation: 'g' },
  { character: 'घ', word: 'घर', hint: 'house', type: 'consonant', pronunciation: 'gh' },
  { character: 'च', word: 'चम्मच', hint: 'spoon', type: 'consonant', pronunciation: 'ch' },
  { character: 'छ', word: 'छतरी', hint: 'umbrella', type: 'consonant', pronunciation: 'chh' },
  { character: 'ज', word: 'जहाज', hint: 'ship', type: 'consonant', pronunciation: 'j' },
  { character: 'झ', word: 'झंडा', hint: 'flag', type: 'consonant', pronunciation: 'jh' },
  { character: 'ट', word: 'टमाटर', hint: 'tomato', type: 'consonant', pronunciation: 't' },
  { character: 'ठ', word: 'ठठेरा', hint: 'tinsmith', type: 'consonant', pronunciation: 'th' },
  { character: 'ड', word: 'डमरू', hint: 'small drum', type: 'consonant', pronunciation: 'd' },
  { character: 'ढ', word: 'ढक्कन', hint: 'lid', type: 'consonant', pronunciation: 'dh' },
  { character: 'त', word: 'तरबूज', hint: 'watermelon', type: 'consonant', pronunciation: 't' },
  { character: 'थ', word: 'थर्मस', hint: 'thermos', type: 'consonant', pronunciation: 'th' },
  { character: 'द', word: 'दवात', hint: 'inkpot', type: 'consonant', pronunciation: 'd' },
  { character: 'ध', word: 'धनुष', hint: 'bow', type: 'consonant', pronunciation: 'dh' },
  { character: 'न', word: 'नल', hint: 'tap', type: 'consonant', pronunciation: 'n' },
  { character: 'प', word: 'पतंग', hint: 'kite', type: 'consonant', pronunciation: 'p' },
  { character: 'फ', word: 'फल', hint: 'fruits', type: 'consonant', pronunciation: 'ph' },
  { character: 'ब', word: 'बकरी', hint: 'goat', type: 'consonant', pronunciation: 'b' },
  { character: 'भ', word: 'भालू', hint: 'bear', type: 'consonant', pronunciation: 'bh' },
  { character: 'म', word: 'मछली', hint: 'fish', type: 'consonant', pronunciation: 'm' },
  { character: 'य', word: 'यज्ञ', hint: 'ritual', type: 'consonant', pronunciation: 'y' },
  { character: 'र', word: 'रथ', hint: 'chariot', type: 'consonant', pronunciation: 'r' },
  { character: 'ल', word: 'लट्टू', hint: 'spinning top', type: 'consonant', pronunciation: 'l' },
  { character: 'व', word: 'वक', hint: 'crane', type: 'consonant', pronunciation: 'v' },
  { character: 'श', word: 'शलगम', hint: 'turnip', type: 'consonant', pronunciation: 'sh' },
  { character: 'ष', word: 'षट्कोण', hint: 'hexagon', type: 'consonant', pronunciation: 'sh' },
  { character: 'स', word: 'सपेरा', hint: 'snake charmer', type: 'consonant', pronunciation: 's' },
  { character: 'ह', word: 'हाथी', hint: 'elephant', type: 'consonant', pronunciation: 'h' },
  { character: 'क्ष', word: 'क्षत्रिय', hint: 'warrior', type: 'consonant', pronunciation: 'ksh' },
  { character: 'त्र', word: 'त्रिशूल', hint: 'trident', type: 'consonant', pronunciation: 'tr' },
  { character: 'ज्ञ', word: 'ज्ञानी', hint: 'knowledgeable person', type: 'consonant', pronunciation: 'gy' },
];

export const hindiCharacters: HindiCharacter[] = [...hindiVowels, ...hindiConsonants];
