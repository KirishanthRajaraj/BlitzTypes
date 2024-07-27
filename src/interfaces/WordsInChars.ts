import { CharObject } from "./CharObject";

export interface WordsInChars {
    chars: Array<CharObject>;
    isCorrect?: boolean;
    isTyped?: boolean;
}