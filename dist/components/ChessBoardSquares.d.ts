import React from 'react';
import { ChessPiece, ChessSquare } from '../types';
export default class ChessBoardSquares extends React.Component<ChessBoardSquaresProps, ChessBoardSquaresState> {
    constructor(props: ChessBoardSquaresProps);
    render(): JSX.Element;
    clearSelectedSquare(): void;
    setSelectedSquare(square?: ChessSquare): void;
    onSquareClick(square: ChessSquare): void;
}
interface ChessBoardSquaresProps {
    pieces: (ChessPiece | undefined)[][];
}
interface ChessBoardSquaresState {
    selectedSquare?: ChessSquare;
}
export {};
