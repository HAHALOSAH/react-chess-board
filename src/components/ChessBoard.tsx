import React from 'react';

import ChessBoardSquares from './ChessBoardSquares';

import { ChessColor, ChessPiece, ChessPieceType, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';

export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess = new Chess();
    constructor(props: {

    }) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            pieces: Array(8).fill([])
        }
    }

    render() {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
            }} onClick={this.onClick}>
                <ChessBoardSquares pieces={this.state.pieces}/>
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

}

interface ChessBoardProps {
    
}

interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][]
}