import React from 'react';

import Staunty from '../Staunty';

import { ChessColor, ChessPiece } from '../types'

export default class ChessPieceIcon extends React.Component<ChessPieceIconProps> {
    render() {
        return (
            <div style={{
                display: typeof this.props.piece == 'number' && typeof this.props.color == 'number' ? 'block' : 'none',
                filter: 'drop-shadow(0 0 0.5rem #aaaaaa)',
            }}>
                {
                    typeof this.props.piece == 'number' && typeof this.props.color == 'number' &&
                    Staunty[
                        [['wP', 'wN', 'wB', 'wR', 'wQ', 'wK'], ['bP', 'bN', 'bB', 'bR', 'bQ', 'bK']][this.props.color as number][this.props.piece as number]
                    ]
                }
            </div>
        );
    }
}

interface ChessPieceIconProps {
    piece?: ChessPiece,
    color?: ChessColor
}