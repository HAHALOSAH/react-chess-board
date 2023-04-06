import React from 'react';

import Staunty from '../Staunty';

import { ChessPiece } from '../types'
import { ChessBoardConfig } from '../ChessBoardConfig';

export default class ChessPieceIcon extends React.Component<ChessPieceIconProps> {
    render() {
        return (
            <div style={{
                display: typeof this.props.piece == 'object' ? 'block' : 'none',
                position: "relative",
                pointerEvents: 'none',
            }}>
                {
                    <div style={{
                        filter: 'drop-shadow(0 0 0.5rem #aaaaaa)',
                        position: 'absolute',
                        margin: 'auto',
                        inset: '0',
                        pointerEvents: 'none',
                    }}>
                        {
                            typeof this.props.piece == 'object' &&
                            [[
                                Staunty['wP'],
                                Staunty['wN'],
                                Staunty['wB'],
                                Staunty['wR'],
                                Staunty['wQ'],
                                Staunty['wK']
                            ], [
                                Staunty['bP'],
                                Staunty['bN'],
                                Staunty['bB'],
                                Staunty['bR'],
                                Staunty['bQ'],
                                Staunty['bK']
                            ]][this.props.piece.color][this.props.piece.type]
                        }
                    </div>
                }
            </div>
        );
    }
}

interface ChessPieceIconProps {
    piece?: ChessPiece;
    config?: ChessBoardConfig;
}