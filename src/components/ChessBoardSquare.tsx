import React from 'react';
import ChessPieceIcon from './ChessPieceIcon';

import { ChessColor, ChessPiece } from '../types'

export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    render() {
        return (
            <div style={{
                backgroundColor: (this.props.row + this.props.file) % 2 === 0 ? 'white' : '#AAAAAA',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
            }}>
                <ChessPieceIcon color={this.props.row < 4 ? ChessColor.BLACK : ChessColor.WHITE} piece={(this.props.row == 1 || this.props.row == 6) ? ChessPiece.PAWN : this.props.row == 0 || this.props.row == 7 ? [ChessPiece.ROOK, ChessPiece.KNIGHT, ChessPiece.BISHOP, ChessPiece.QUEEN, ChessPiece.KING, ChessPiece.BISHOP, ChessPiece.KNIGHT, ChessPiece.ROOK][this.props.file] : undefined}/>
            </div>
        );
    }
}

interface ChessBoardSquareProps {
    row: number;
    file: number;
}