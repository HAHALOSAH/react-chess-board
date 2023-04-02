import React from 'react';

import ChessBoardSquares from './ChessBoardSquares';

import { ChessColor, ChessMove, ChessPiece, ChessPieceType, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
import { chessSquareToText } from '../util';

export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess = new Chess();
    constructor(props: {

    }) {
        super(props);
        this.state = {
            pieces: Array(8).fill([])
        }

        this.onClick = this.onClick.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    render() {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
            }} onClick={this.onClick}>
                <ChessBoardSquares pieces={this.state.pieces} onMove={this.onMove} />
            </div>
        );
    }

    onClick() {

    }

    updatePieces() {
        this.setState({
            pieces:
                (this._chess.board().map(row => {
                    return row.map(piece => {
                        if (piece == null) return undefined;
                        return {
                            color: piece.color == "w" ? ChessColor.WHITE : ChessColor.BLACK,
                            type: ["p", "n", "b", "r", "q", "k"].indexOf(piece.type)
                        };
                    });
                }) as (ChessPiece | undefined)[][])
        });
    }

    componentDidMount(): void {
        this.updatePieces();
    }

    onMove(move: ChessMove) {
        try {
            this._chess.move({
                from: chessSquareToText(move.from),
                to: chessSquareToText(move.to),
            });
        } catch (e) {
            // Invalid move, just ignore it
            return;
        }
        this.updatePieces();
    }
}

interface ChessBoardProps {

}

interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][]
}