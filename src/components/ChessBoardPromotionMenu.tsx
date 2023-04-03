import React from 'react';

import ChessBoardSquare from './ChessBoardSquare';
import { ChessColor, ChessPiece, ChessPieceType } from '../types';

export default class ChessBoardPromotionMenu extends React.Component<ChessBoardPromotionMenuProps, ChessBoardPromotionMenuState> {
    backdrop: React.RefObject<HTMLDivElement> = React.createRef();
    callbacks: ((result?: ChessPieceType) => void)[] = [];
    constructor(props: ChessBoardPromotionMenuProps) {
        super(props);

        this.state = {
            isOpen: false,
            color: undefined,
            file: undefined,
        }

        this.onSquareHover = this.onSquareHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onSquareClick = this.onSquareClick.bind(this);
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                inset: '0px',
                pointerEvents: this.state.isOpen ? 'auto' : 'none',
                opacity: this.state.isOpen ? 1 : 0,
                transition: '0.2s',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: '0px',
                    backgroundColor: '#00000088',
                }} ref={this.backdrop} onClick={() => {
                    this.close();
                    this.returnCallbacks(undefined);
                }} ></div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gridTemplateRows: 'repeat(4, 1fr)',
                    width: (1 / 8 * 100) + '%',
                    height: (4 / 8 * 100) + '%',
                    alignItems: 'stretch',
                    cursor: 'pointer',
                    position: 'relative',
                    left: (this.state.file || 0) / 8 * 100 + '%',
                    top: (this.state.color == ChessColor.WHITE ? 0 : 4) / 8 * 100 + '%',
                    filter: 'drop-shadow(0px 0px 16px #000000)'
                }} onMouseOut={this.onMouseOut}>
                    <ChessBoardSquare square={{ row: this.state.color == ChessColor.WHITE ? 0 : 7, file: this.state.file || 0 }} piece={
                        typeof this.state.color == 'number' ? { color: this.state.color, type: ChessPieceType.QUEEN } : undefined
                    } onMouseOver={() => {
                        this.onSquareHover(0);
                    }} destination={this.state.selected == 0} onClick={() => {
                        this.onSquareClick(0);
                    }} style={{ order: this.state.color == ChessColor.WHITE ? 0 : 3}} />
                    <ChessBoardSquare square={{ row: this.state.color == ChessColor.WHITE ? 1 : 6, file: this.state.file || 0 }} piece={
                        typeof this.state.color == 'number' ? { color: this.state.color, type: ChessPieceType.KNIGHT } : undefined
                    } onMouseOver={() => {
                        this.onSquareHover(1);
                    }} destination={this.state.selected == 1} onClick={() => {
                        this.onSquareClick(1);
                    }} style={{ order: this.state.color == ChessColor.WHITE ? 1 : 2}} />
                    <ChessBoardSquare square={{ row: this.state.color == ChessColor.WHITE ? 2 : 5, file: this.state.file || 0 }} piece={
                        typeof this.state.color == 'number' ? { color: this.state.color, type: ChessPieceType.ROOK } : undefined
                    } onMouseOver={() => {
                        this.onSquareHover(2);
                    }} destination={this.state.selected == 2} onClick={() => {
                        this.onSquareClick(2);
                    }} style={{ order: this.state.color == ChessColor.WHITE ? 2 : 1}} />
                    <ChessBoardSquare square={{ row: this.state.color == ChessColor.WHITE ? 3 : 4, file: this.state.file || 0 }} piece={
                        typeof this.state.color == 'number' ? { color: this.state.color, type: ChessPieceType.BISHOP } : undefined
                    } onMouseOver={() => {
                        this.onSquareHover(3);
                    }} destination={this.state.selected == 3} onClick={() => {
                        this.onSquareClick(3);
                    }} style={{ order: this.state.color == ChessColor.WHITE ? 3 : 0}} />
                </div>
            </div>
        );
    }

    onClick() {

    }

    close() {
        this.setState({
            isOpen: false,
        });
    }

    onSquareHover(square: number) {
        this.setState({
            selected: square,
        });
    }

    onSquareClick(square: number) {
        this.close();
        this.returnCallbacks([
            ChessPieceType.QUEEN,
            ChessPieceType.KNIGHT,
            ChessPieceType.ROOK,
            ChessPieceType.BISHOP
        ][square]);
    }

    onMouseOut() {
        this.setState({
            selected: undefined,
        });
    }

    returnCallbacks(result?: ChessPieceType) {
        for (let callback of this.callbacks) {
            callback(result);
        }
        this.callbacks = [];
    }

    open(color: ChessColor, file: number, callback: (result?: ChessPieceType) => void) {
        this.callbacks.push(callback);
        this.setState({
            isOpen: true,
            color: color,
            file: file,
        });
    }

    openAsync(color: ChessColor, file: number): Promise<ChessPieceType | undefined> {
        return new Promise((resolve) => {
            this.open(color, file, resolve);
        });
    }
}

interface ChessBoardPromotionMenuProps {

}

interface ChessBoardPromotionMenuState {
    isOpen: boolean;
    color?: ChessColor;
    file?: number;
    selected?: number;
}