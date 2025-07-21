export interface HindiCharacter {
  character: string;
  word: string;
  hint: string;
  type: 'vowel' | 'consonant';
}

export const hindiVowels: HindiCharacter[] = [
  { character: 'a = अ', word: 'a se anar', hint: 'red fruit', type: 'vowel' },
  { character: 'aa = आ', word: 'aa se aam', hint: 'king of fruits', type: 'vowel' },
  { character: 'i = इ', word: 'i se imli', hint: 'sour tamarind', type: 'vowel' },
  { character: 'ee = ई', word: 'ee se eekh', hint: 'sweet sugarcane', type: 'vowel' },
  { character: 'u = उ', word: 'u se ullu', hint: 'night bird', type: 'vowel' },
  { character: 'oo = ऊ', word: 'oo se oon', hint: 'soft wool', type: 'vowel' },
  { character: 'ri = ऋ', word: 'ri se rishi', hint: 'wise sage', type: 'vowel' },
  { character: 'e = ए', word: 'e se edi', hint: 'body part heel', type: 'vowel' },
  { character: 'ai = ऐ', word: 'ai se ainak', hint: 'spectacles', type: 'vowel' },
  { character: 'o = ओ', word: 'o se okhli', hint: 'mortar', type: 'vowel' },
  { character: 'au = औ', word: 'au se aurat', hint: 'woman', type: 'vowel' },
  { character: 'an = अं', word: 'an se angoor', hint: 'grapes', type: 'vowel' },
  { character: 'ah = अः', word: 'ah se namah', hint: 'a greeting', type: 'vowel' },
];

export const hindiConsonants: HindiCharacter[] = [
  { character: 'क', word: 'कमल', hint: 'lotus flower', type: 'consonant' },
  { character: 'ख', word: 'खरगोश', hint: 'rabbit', type: 'consonant' },
  { character: 'ग', word: 'गमला', hint: 'flower pot', type: 'consonant' },
  { character: 'घ', word: 'घर', hint: 'house', type: 'consonant' },
  { character: 'च', word: 'चम्मच', hint: 'spoon', type: 'consonant' },
  { character: 'छ', word: 'छतरी', hint: 'umbrella', type: 'consonant' },
  { character: 'ज', word: 'जहाज', hint: 'ship', type: 'consonant' },
  { character: 'झ', word: 'झंडा', hint: 'flag', type: 'consonant' },
  { character: 'ट', word: 'टमाटर', hint: 'tomato', type: 'consonant' },
  { character: 'ठ', word: 'ठठेरा', hint: 'tinsmith', type: 'consonant' },
  { character: 'ड', word: 'डमरू', hint: 'small drum', type: 'consonant' },
  { character: 'ढ', word: 'ढक्कन', hint: 'lid', type: 'consonant' },
  { character: 'त', word: 'तरबूज', hint: 'watermelon', type: 'consonant' },
  { character: 'थ', word: 'थर्मस', hint: 'thermos', type: 'consonant' },
  { character: 'द', word: 'दवात', hint: 'inkpot', type: 'consonant' },
  { character: 'ध', word: 'धनुष', hint: 'bow', type: 'consonant' },
  { character: 'न', word: 'नल', hint: 'tap', type: 'consonant' },
  { character: 'प', word: 'पतंग', hint: 'kite', type: 'consonant' },
  { character: 'फ', word: 'फल', hint: 'fruits', type: 'consonant' },
  { character: 'ब', word: 'बकरी', hint: 'goat', type: 'consonant' },
  { character: 'भ', word: 'भालू', hint: 'bear', type: 'consonant' },
  { character: 'म', word: 'मछली', hint: 'fish', type: 'consonant' },
  { character: 'य', word: 'यज्ञ', hint: 'ritual', type: 'consonant' },
  { character: 'र', word: 'रथ', hint: 'chariot', type: 'consonant' },
  { character: 'ल', word: 'लट्टू', hint: 'spinning top', type: 'consonant' },
  { character: 'व', word: 'वक', hint: 'crane', type: 'consonant' },
  { character: 'श', word: 'शलगम', hint: 'turnip', type: 'consonant' },
  { character: 'ष', word: 'षट्कोण', hint: 'hexagon', type: 'consonant' },
  { character: 'स', word: 'सपेरा', hint: 'snake charmer', type: 'consonant' },
  { character: 'ह', word: 'हाथी', hint: 'elephant', type: 'consonant' },
  { character: 'क्ष', word: 'क्षत्रिय', hint: 'warrior', type: 'consonant' },
  { character: 'त्र', word: 'त्रिशूल', hint: 'trident', type: 'consonant' },
  { character: 'ज्ञ', word: 'ज्ञानी', hint: 'knowledgeable person', type: 'consonant' },
];

export const hindiCharacters: HindiCharacter[] = [...hindiVowels, ...hindiConsonants];
