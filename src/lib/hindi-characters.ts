export interface HindiCharacter {
  character: string;
  word: string;
  hint: string;
  type: 'vowel' | 'consonant';
}

export const hindiVowels: HindiCharacter[] = [
  { character: 'अ', word: 'अनार', hint: 'red fruit', type: 'vowel' },
  { character: 'आ', word: 'आम', hint: 'king of fruits', type: 'vowel' },
  { character: 'इ', word: 'इमली', hint: 'sour tamarind', type: 'vowel' },
  { character: 'ई', word: 'ईख', hint: 'sweet sugarcane', type: 'vowel' },
  { character: 'उ', word: 'उल्लू', hint: 'night bird', type: 'vowel' },
  { character: 'ऊ', word: 'ऊन', hint: 'soft wool', type: 'vowel' },
  { character: 'ऋ', word: 'ऋषि', hint: 'wise sage', type: 'vowel' },
  { character: 'ए', word: 'एड़ी', hint: 'body part heel', type: 'vowel' },
  { character: 'ऐ', word: 'ऐनक', hint: 'spectacles', type: 'vowel' },
  { character: 'ओ', word: 'ओखली', hint: 'mortar', type: 'vowel' },
  { character: 'औ', word: 'औरत', hint: 'woman', type: 'vowel' },
  { character: 'अं', word: 'अंगूर', hint: 'grapes', type: 'vowel' },
  { character: 'अः', word: 'नमः', hint: 'a greeting', type: 'vowel' },
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
