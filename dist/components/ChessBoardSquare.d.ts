import React from 'react';
import { ChessPiece, ChessSquare } from '../types';
import { ChessBoardConfig } from '../ChessBoardConfig';
export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    constructor(props: ChessBoardSquareProps);
    render(): JSX.Element;
}
interface ChessBoardSquareProps {
    square: ChessSquare;
    piece?: ChessPiece;
    selected?: boolean;
    destination?: boolean;
    valid?: boolean;
    underAttack?: boolean;
    recent?: boolean;
    style?: React.CSSProperties;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseOver?: () => void;
    onClick?: () => void;
    config?: ChessBoardConfig;
}
export {};
