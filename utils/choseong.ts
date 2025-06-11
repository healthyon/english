
import { CHO_SUNG_LIST } from '../constants';

const GA_CODE = 44032; // '가'
const HANGUL_RANGE = 588; // Number of Hangul syllables per Chosung
const JUNG_RANGE = 28; // Number of Jungsung per Chosung
// const JONG_RANGE = 28; // Number of Jongsung values (including no Jongsung)

export function getChoSeong(char: string): string {
  const charCode = char.charCodeAt(0);
  if (charCode >= GA_CODE && charCode < (GA_CODE + CHO_SUNG_LIST.length * HANGUL_RANGE) ) {
    const choIndex = Math.floor((charCode - GA_CODE) / HANGUL_RANGE);
    return CHO_SUNG_LIST[choIndex];
  }
  if (CHO_SUNG_LIST.includes(char)) return char; // Already a chosung
  return char.toLowerCase(); // For non-Hangul or standalone consonants/vowels
}

export function textIncludesQuery(text: string, query: string): boolean {
  if (!query) return true;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerText.includes(lowerQuery)) return true;

  // Chosung search
  // Only apply chosung search if query seems to be chosung-only or mixed with non-Hangul
  const queryIsPotentiallyChosung = query.split('').every(char => 
    CHO_SUNG_LIST.includes(char) || char.charCodeAt(0) < GA_CODE || char.charCodeAt(0) >= (GA_CODE + CHO_SUNG_LIST.length * HANGUL_RANGE)
  );

  if (queryIsPotentiallyChosung) {
    const textChoSeong = text.split('').map(getChoSeong).join('');
    const queryChoSeong = query.split('').map(getChoSeong).join('');
    if (textChoSeong.includes(queryChoSeong)) return true;
  }
  
  return false;
}
