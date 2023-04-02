import React from 'react';
import { ChessPiece, ChessSquare } from '../types';
export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    constructor(props: ChessBoardSquareProps);
    render(): JSX.Element;
}
interface ChessBoardSquareProps {
    square: ChessSquare;
    piece?: ChessPiece;
    selected?: boolean;
    destination?: boolean;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseOver?: () => void;
}
export {};
