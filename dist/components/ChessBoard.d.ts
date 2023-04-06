import React from 'react';
import ChessBoardPromotionMenu from './ChessBoardPromotionMenu';
import { ChessColor, ChessMove, ChessPiece, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
import { ChessBoardConfig } from '../ChessBoardConfig';
export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess: Chess;
    promotionMenu: React.RefObject<ChessBoardPromotionMenu>;
    constructor(props: ChessBoardProps);
    render(): JSX.Element;
    promotion(color: ChessColor, file: number): Promise<import("../types").ChessPieceType | undefined>;
    componentDidMount(): void;
}
interface ChessBoardProps {
    onMove?: (move: ChessMove) => void;
    getLegalMoves?: (square: ChessSquare) => ChessSquare[];
    inCheck?: () => boolean;
    getTurn?: () => ChessColor;
    updatePieces?: () => void;
    pieces: (ChessPiece | undefined)[][];
    config?: ChessBoardConfig;
}
interface ChessBoardState {
    selectedSquare?: ChessSquare;
    recent: ChessSquare[];
}
export {};
