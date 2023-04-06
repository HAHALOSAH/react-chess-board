import React from 'react';
import ChessPieceIcon from './ChessPieceIcon';

import { ChessPiece, ChessSquare } from '../types'
import { ChessBoardConfig } from '../ChessBoardConfig';

export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    constructor(props: ChessBoardSquareProps) {
        super(props);
    }
    
    render() {
        let borderColor = this.props.config?.square?.borderColor || '#FF6666DD';
        let borderWidth = this.props.config?.square?.borderWidth || '8px';
        let legalMoveBackgroundColor = this.props.config?.square?.legalMoveBackgroundColor || '#00000033';
        let legalCaptureBackgroundColor = this.props.config?.square?.legalCaptureBackgroundColor || '#00000033';
        let transition = this.props.config?.transition || '0.2s';

        return (
            <div style={{ ... this.props.style,
                backgroundColor: (this.props.square.row + this.props.square.file) % 2 === 0 ? this.props.config?.board?.boardColor1 || 'white' : this.props.config?.board?.boardColor2 || '#AAAAAA',
                border: this.props.destination ? `${borderWidth} solid ${borderColor}` : `0px solid ${borderColor}`,
                width: '100%',
                height: '100%',
                position: 'relative',
                boxSizing: 'border-box',
                transition: transition,
            }} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} onMouseOver={this.props.onMouseOver} onClick={this.props.onClick} tabIndex={0}>
                <div style={{
                    position: 'absolute',
                    inset: '0px',
                    backgroundColor: this.props.selected ? this.props.config?.square?.selectedBackgroundColor || '#FF6666DD' : this.props.config?.square?.recentMoveBackgroundColor || '#AACCFF88',
                    pointerEvents: 'none',
                    opacity: this.props.selected || this.props.recent ? 1 : 0,
                    transition: transition
                }}></div>
                <div style={typeof this.props.piece == 'object' ? {
                    position: 'absolute',
                    inset: '0px',
                    background: `radial-gradient(transparent 0%, transparent 79%, ${legalCaptureBackgroundColor} 80%)`,
                    pointerEvents: 'none',
                    opacity: this.props.valid ? 1 : 0,
                    transition: transition
                } : {
                    position: 'absolute',
                    inset: '0px',
                    margin: 'auto',
                    width: '35%',
                    height: '35%',
                    borderRadius: '50%',
                    backgroundColor: legalMoveBackgroundColor,
                    pointerEvents: 'none',
                    opacity: this.props.valid ? 1 : 0,
                    transition: transition
                }} ></div>
                <div style={{
                    position: 'absolute',
                    inset: '0px',
                    background: `radial-gradient(${this.props.config?.square?.underAttackBackgroundColor || '#FF0000'} 20%, transparent 80%)`,
                    pointerEvents: 'none',
                    opacity: this.props.underAttack ? 1 : 0,
                    transition: transition
                }} ></div>
                <ChessPieceIcon piece={this.props.piece} config={this.props.config} />
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
    underAttack?: boolean;
    recent?: boolean;
    style?: React.CSSProperties;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseOver?: () => void;
    onClick?: () => void;
    config?: ChessBoardConfig;
}