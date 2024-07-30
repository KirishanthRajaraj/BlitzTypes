import { WordsInChars } from "./WordsInChars";

export interface Result {
    finalWords?: Array<WordsInChars>;
    isFinished?: boolean;
    typingTime?: number;
}