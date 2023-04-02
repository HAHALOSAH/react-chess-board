import { ChessSquare } from "./types";

export function chessSquareToText(square: ChessSquare): string {
    return ["a", "b", "c", "d", "e", "f", "g", "h"][square.file] + (8 - square.row);
}