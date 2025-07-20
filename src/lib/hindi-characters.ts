export interface HindiCharacter {
  vowel: string;
  word: string;
  hint: string;
}

export interface HindiConsonant {
  consonant: string;
  word: string;
  hint: string;
}

export const hindiVowels: HindiCharacter[] = [
  { vowel: 'अ', word: 'अनार', hint: 'red fruit' },
  { vowel: 'आ', word: 'आम', hint: 'king of fruits' },
  { vowel: 'इ', word: 'इमली', hint: 'sour tamarind' },
  { vowel: 'ई', word: 'ईख', hint: 'sweet sugarcane' },
  { vowel: 'उ', word: 'उल्लू', hint: 'night bird' },
  { vowel: 'ऊ', word: 'ऊन', hint: 'soft wool' },
  { vowel: 'ऋ', word: 'ऋषि', hint: 'wise sage' },
  { vowel: 'ए', word: 'एड़ी', hint: 'body part heel' },
  { vowel: 'ऐ', word: 'ऐनक', hint: 'spectacles' },
  { vowel: 'ओ', word: 'ओखली', hint: 'mortar' },
  { vowel: 'औ', word: 'औरत', hint: 'woman' },
  { vowel: 'अं', word: 'अंगूर', hint: 'grapes' },
  { vowel: 'अः', word: 'नमः', hint: 'a greeting' },
];

export const hindiConsonants: HindiConsonant[] = [
  { consonant: 'क', word: 'कमल', hint: 'lotus flower' },
  { consonant: 'ख', word: 'खरगोश', hint: 'rabbit' },
  { consonant: 'ग', word: 'गमला', hint: 'flower pot' },
  { consonant: 'घ', word: 'घर', hint: 'house' },
  { consonant: 'च', word: 'चम्मच', hint: 'spoon' },
  { consonant: 'छ', word: 'छतरी', hint: 'umbrella' },
  { consonant: 'ज', word: 'जहाज', hint: 'ship' },
  { consonant: 'झ', word: 'झंडा', hint: 'flag' },
  { consonant: 'ट', word: 'टमाटर', hint: 'tomato' },
  { consonant: 'ठ', word: 'ठठेरा', hint: 'tinsmith' },
  { consonant: 'ड', word: 'डमरू', hint: 'small drum' },
  { consonant: 'ढ', word: 'ढक्कन', hint: 'lid' },
  { consonant: 'त', word: 'तरबूज', hint: 'watermelon' },
  { consonant: 'थ', word: 'थर्मस', hint: 'thermos' },
  { consonant: 'द', word: 'दवात', hint: 'inkpot' },
  { consonant: 'ध', word: 'धनुष', hint: 'bow' },
  { consonant: 'न', word: 'नल', hint: 'tap' },
  { consonant: 'प', word: 'पतंग', hint: 'kite' },
  { consonant: 'फ', word: 'फल', hint: 'fruits' },
  { consonant: 'ब', word: 'बकरी', hint: 'goat' },
  { consonant: 'भ', word: 'भालू', hint: 'bear' },
  { consonant: 'म', word: 'मछली', hint: 'fish' },
  { consonant: 'य', word: 'यज्ञ', hint: 'ritual' },
  { consonant: 'र', word: 'रथ', hint: 'chariot' },
  { consonant: 'ल', word: 'लट्टू', hint: 'spinning top' },
  { consonant: 'व', word: 'वक', hint: 'crane' },
  { consonant: 'श', word: 'शलगम', hint: 'turnip' },
  { consonant: 'ष', word: 'षट्कोण', hint: 'hexagon' },
  { consonant: 'स', word: 'सपेरा', hint: 'snake charmer' },
  { consonant: 'ह', word: 'हाथी', hint: 'elephant' },
  { consonant: 'क्ष', word: 'क्षत्रिय', hint: 'warrior' },
  { consonant: 'त्र', word: 'त्रिशूल', hint: 'trident' },
  { consonant: 'ज्ञ', word: 'ज्ञानी', hint: 'knowledgeable person' },
];
