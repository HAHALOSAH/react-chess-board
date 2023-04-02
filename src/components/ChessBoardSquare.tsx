import React from 'react';
import ChessPieceIcon from './ChessPieceIcon';

import { ChessPiece, ChessSquare } from '../types'

export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    constructor(props: ChessBoardSquareProps) {
        super(props);
    }
    
    render() {
        return (
            <div style={{
                backgroundColor: (this.props.square.row + this.props.square.file) % 2 === 0 ? 'white' : '#AAAAAA',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                position: 'relative'
            }} onMouseDown={this.props.onMouseDown}>
                <div style={{
                    position: 'absolute',
                    inset: '0px',
                    backgroundColor: '#FF8888AA',
                    pointerEvents: 'none',
                    display: this.props.selected ? 'block' : 'none'
                }}></div>
                <ChessPieceIcon piece={this.props.piece}/>
            </div>
        );
    }
}

interface ChessBoardSquareProps {
    square: ChessSquare;
    piece?: ChessPiece;
    selected?: boolean;
    onMouseDown?: () => void;
}