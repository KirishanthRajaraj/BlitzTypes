import { Language } from "@/enums/language";
import { WordsInChars } from "./WordsInChars";

export interface Result {
    finalWords?: Array<WordsInChars>;
    isFinished?: boolean;
    typingTime?: number;
    currentTime?: number;
    language?: Language;
    interval?: number;
    [key: string]: any;
}