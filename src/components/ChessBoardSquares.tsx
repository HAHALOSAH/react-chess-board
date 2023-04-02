import React from 'react';

import ChessBoardSquare from './ChessBoardSquare';
import { ChessPiece, ChessSquare } from '../types';

export default class ChessBoardSquares extends React.Component<ChessBoardSquaresProps, ChessBoardSquaresState> {
    constructor(props: ChessBoardSquaresProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
                width: '100%',
                height: '100%',
                alignItems: 'stretch',
            }}>
                {
                    Array(8 * 8).fill(0).map((_, i) => {
                        let row = (i / 8) | 0;
                        let file = i % 8;
                        return (
                            <ChessBoardSquare piece={this.props.pieces[row][file]} square={{ row: row, file: file }} key={i} selected={this.state.selectedSquare?.row == row && this.state.selectedSquare.file == file} onMouseDown={() =>{
                                this.onSquareClick({ row: row, file: file });
                            }}/>
                        );
                    })
                }
            </div>
        );
    }

    clearSelectedSquare() {
        this.setState({
            selectedSquare: undefined
        });
    }

    setSelectedSquare(square?: ChessSquare) {
        this.setState({
            selectedSquare: square
        });
    }

    onSquareClick(square: ChessSquare) {
        if (this.state.selectedSquare?.row == square.row && this.state.selectedSquare.file == square.file) {
            this.setSelectedSquare();
            return;
        }
        this.setSelectedSquare(square);
    }
}

interface ChessBoardSquaresProps {
    pieces: (ChessPiece | undefined)[][]
}

interface ChessBoardSquaresState {
    selectedSquare?: ChessSquare;
}