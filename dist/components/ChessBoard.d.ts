import React from 'react';
import { ChessMove, ChessPiece, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess: Chess;
    constructor(props: {});
    render(): JSX.Element;
    onClick(): void;
    updatePieces(): void;
    componentDidMount(): void;
    onMove(move: ChessMove): void;
}
interface ChessBoardProps {
}
interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][];
}
export {};
