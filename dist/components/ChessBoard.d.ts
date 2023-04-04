import React from 'react';
import ChessBoardPromotionMenu from './ChessBoardPromotionMenu';
import { ChessColor, ChessMove, ChessPiece, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess: Chess;
    promotionMenu: React.RefObject<ChessBoardPromotionMenu>;
    constructor(props: {});
    render(): JSX.Element;
    onClick(): void;
    updatePieces(): void;
    componentDidMount(): void;
    onMove(move: ChessMove): Promise<void>;
    getLegalMoves(square: ChessSquare): {
        row: number;
        file: number;
    }[];
    inCheck(): boolean;
    getTurn(): ChessColor;
}
interface ChessBoardProps {
}
interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][];
}
export {};
