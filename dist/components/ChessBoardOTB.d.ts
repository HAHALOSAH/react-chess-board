import React from 'react';
import ChessBoard from './ChessBoard';
import { ChessColor, ChessMove, ChessPiece, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
import { ChessBoardConfig } from '../ChessBoardConfig';
export default class ChessBoardOTB extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess: Chess;
    chessBoard: React.RefObject<ChessBoard>;
    constructor(props: ChessBoardProps);
    render(): JSX.Element;
    updatePieces(): void;
    componentDidMount(): void;
    onMove(move: ChessMove): Promise<void>;
    getLegalMoves(square: ChessSquare): ChessSquare[];
    inCheck(): boolean;
    getTurn(): ChessColor;
}
interface ChessBoardProps {
    config?: ChessBoardConfig;
}
interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][];
    recent: ChessSquare[];
}
export {};
