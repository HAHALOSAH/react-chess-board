import React from 'react';
import ChessPieceIcon from './ChessPieceIcon';

import { ChessPiece, ChessSquare } from '../types'

export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    constructor(props: ChessBoardSquareProps) {
        super(props);
    }
    
    render() {
        return (
            <div style={{ ... this.props.style,
                backgroundColor: (this.props.square.row + this.props.square.file) % 2 === 0 ? 'white' : '#AAAAAA',
                border: this.props.destination ? '8px solid #FF6666DD' : '0px solid #FF6666DD',
                width: '100%',
                height: '100%',
                position: 'relative',
                boxSizing: 'border-box',
                transition: '0.2s',
            }} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} onMouseOver={this.props.onMouseOver} onClick={this.props.onClick} tabIndex={0}>
                <div style={{
                    position: 'absolute',
                    inset: '0px',
                    backgroundColor: '#FF6666DD',
                    pointerEvents: 'none',
                    opacity: this.props.selected ? 1 : 0,
                    transition: '0.2s'
                }}></div>
                <div style={typeof this.props.piece == 'object' ? {
                    position: 'absolute',
                    inset: '0px',
                    background: 'radial-gradient(transparent 0%, transparent 79%, #00000033 80%)',
                    pointerEvents: 'none',
                    opacity: this.props.valid ? 1 : 0,
                } : {
                    position: 'absolute',
                    inset: '0px',
                    margin: 'auto',
                    width: '35%',
                    height: '35%',
                    borderRadius: '50%',
                    backgroundColor: '#00000033',
                    pointerEvents: 'none',
                    opacity: this.props.valid ? 1 : 0,
                }} ></div>
                <ChessPieceIcon piece={this.props.piece} />
            </div>
        );
    }
}

interface ChessBoardSquareProps {
    square: ChessSquare;
    piece?: ChessPiece;
    selected?: boolean;
    destination?: boolean;
    valid?: boolean;
    style?: React.CSSProperties;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseOver?: () => void;
    onClick?: () => void;
}