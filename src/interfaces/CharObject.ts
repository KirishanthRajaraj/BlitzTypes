export interface CharObject {
    char: string;
    isCorrect?: boolean;
    isCurrent?: boolean;
    isCurrentPrev?: boolean;
    isTyped?: boolean;
    timeStampTyped?: number;
    color?: string;
    opacity?: number;
}