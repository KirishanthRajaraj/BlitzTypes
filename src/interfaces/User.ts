import { Language } from "@/enums/language";

export interface User {
    id: string;
    userName: string;
    email: string;
    joinedDate?: Date | null;
    blitztypesTitle?: string | null;
    typingTime?: string | null;
    highScoreWPM_15_sec?: number | null;
    highScoreWPM_30_sec?: number | null;
    highScoreWPM_60_sec?: number | null;
    highScoreAccuracy?: number | null;
    secondsWritten?: number | null; 
    testAmount?: number | null;     
    preferredLanguage?: Language | null; 
    preferredTime?: Language | null;      
}