import React from 'react';
import ReactDOM from 'react-dom';

import ChessBoardSquare from './ChessBoardSquare';
import { ChessColor, ChessMove, ChessPiece, ChessPieceType, ChessSquare } from '../types';
import ChessPieceIcon from './ChessPieceIcon';
import { WHITE } from '../../node_modules/chess.js/dist/chess';

// https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
function getElementPosition(element: HTMLElement): {
    x: number;
    y: number;
} {
    var box = element.getBoundingClientRect();

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

    var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { x: Math.round(left), y: Math.round(top) };
}

export default class ChessBoardSquares extends React.Component<ChessBoardSquaresProps, ChessBoardSquaresState> {
    draggedChessPieceStyles: React.CSSProperties = {
        position: 'absolute',
        width: (1 / 8 * 100) + '%',
        height: (1 / 8 * 100) + '%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
    }
    draggedChessPiece: React.RefObject<ChessPieceIcon> = React.createRef();
    draggedChessPieceContainer: React.RefObject<HTMLDivElement> = React.createRef();
    chessBoardSquares: React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: ChessBoardSquaresProps) {
        super(props);
        this.state = {
            isDragging: false,
            willDeselect: false,
        };

        this.onSquareHover = this.onSquareHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
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
                cursor: this.state.isDragging ? (
                    'grabbing'
                ) : (
                    this.state.selectedSquare ? (
                        this.state.selectedSquare && this.state.hoveredSquare && (this.state.hoveredSquare.row == (this.state.selectedSquare as ChessSquare).row && this.state.hoveredSquare.file == (this.state.selectedSquare as ChessSquare).file) ? (
                            'grab'
                        ) : (
                            'pointer'
                        )
                    ) : (
                        this.state.hoveredSquare && this.props.pieces[this.state.hoveredSquare.row][this.state.hoveredSquare.file] ? (
                            'pointer'
                        ) : (
                            'default'
                        )
                    )
                ),
            }} onMouseOut={this.onMouseOut} onMouseDown={this.onMouseDown} ref={this.chessBoardSquares}>
                {
                    Array(8 * 8).fill(0).map((_, i) => {
                        let row = (i / 8) | 0;
                        let file = i % 8;
                        let selected = this.state.selectedSquare?.row == row && this.state.selectedSquare.file == file;
                        let destination = this.state.destinationSquare?.row == row && this.state.destinationSquare.file == file && !selected;
                        return (
                            <ChessBoardSquare piece={this.props.pieces[row][file]} square={{ row: row, file: file }} key={i} selected={selected}
                                destination={destination} onMouseDown={() => {
                                    this.onSquareMouseDown({ row: row, file: file });
                                }} onMouseOver={() => {
                                    this.onSquareHover({ row: row, file: file });
                                }} />
                        );
                    })
                }

                <div style={{
                    ...this.draggedChessPieceStyles,
                    display: this.state.isDragging ? 'block' : 'none',
                }} ref={this.draggedChessPieceContainer}>
                    <ChessPieceIcon piece={this.state.draggedPiece} ref={this.draggedChessPiece} />
                </div>
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

    onSquareMouseDown(square: ChessSquare) {
        if (!this.props.pieces[square.row][square.file] && !this.state.selectedSquare) {
            return;
        }
        if (this.state.isDragging && !this.state.selectedSquare) {
            this.setState({
                isDragging: false
            });
            return;
        }
        if (this.state.selectedSquare && (this.state.selectedSquare.row != square.row || this.state.selectedSquare.file != square.file)) {
            if (this.props.pieces[square.row][square.file] && ((this.props.pieces[square.row][square.file]) as ChessPiece).color == ((this.props.pieces[this.state.selectedSquare.row][this.state.selectedSquare.file]) as ChessPiece).color) {    
                this.setState({
                    willDeselect: false
                });
            } else {
                if (this.props.onMove) {
                    this.props.onMove({
                        from: this.state.selectedSquare,
                        to: square
                    });
                }
                this.clearSelectedSquare();
                this.clearDestinationSquare();
                this.setState({
                    willDeselect: false
                });
                return;
            }
        }
        if (!this.state.isDragging) {
            this.setSelectedSquare(square);
            this.startDragging(square);
            this.setDestinationSquare(square);
        }
    }

    onMouseDown(e: React.MouseEvent<Element, MouseEvent>) {
        this.updateDraggedChessPieceLocation(e.nativeEvent);
    }

    onMouseUp() {
        if (this.state.isDragging && !this.state.selectedSquare) {
            this.setState({
                isDragging: false
            });
            return;
        }
        if (!this.state.selectedSquare) return;
        if (this.state.destinationSquare && this.props.onMove) {
            if (this.state.destinationSquare.row == this.state.selectedSquare.row && this.state.destinationSquare.file == this.state.selectedSquare.file) {
                this.stopDragging();
                if (this.state.willDeselect) {
                    this.clearSelectedSquare();
                    this.setState({
                        willDeselect: false
                    });
                } else {
                    this.setState({
                        willDeselect: true
                    });
                }
                
                this.clearDestinationSquare();
                return;
            }
            this.props.onMove({
                from: this.state.selectedSquare,
                to: this.state.destinationSquare
            });
        }
        this.clearSelectedSquare();
        this.clearDestinationSquare();
        this.stopDragging();
    }

    startDragging(square: ChessSquare) {
        this.setState({
            isDragging: true,
            draggedPiece: this.props.pieces[square.row][square.file]
        });
    }

    stopDragging() {
        this.setState({
            isDragging: false,
            draggedPiece: undefined
        });
    }

    clearDestinationSquare() {
        this.setState({
            destinationSquare: undefined
        });
    }

    setDestinationSquare(square?: ChessSquare) {
        this.setState({
            destinationSquare: square
        });
    }

    onSquareHover(square: ChessSquare) {
        this.setState({
            hoveredSquare: square
        });
        if (this.state.selectedSquare) this.setDestinationSquare(square);
    }

    onMouseMove(e: MouseEvent) {
        this.updateDraggedChessPieceLocation(e);
    }

    updateDraggedChessPieceLocation(e: MouseEvent) {
        if (this.draggedChessPieceContainer.current == null || this.chessBoardSquares.current == null) return;
        let draggedChessPiece = this.draggedChessPieceContainer.current;
        let boardPosition = getElementPosition(this.chessBoardSquares.current);
        draggedChessPiece.style.left = (e.clientX - boardPosition.x) + 'px';
        draggedChessPiece.style.top = (e.clientY - boardPosition.y) + 'px';
    }

    onMouseOut() {
        this.clearDestinationSquare();
    }

    componentDidMount(): void {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount(): void {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
}

interface ChessBoardSquaresProps {
    pieces: (ChessPiece | undefined)[][],
    onMove?: (move: ChessMove) => void
}

interface ChessBoardSquaresState {
    selectedSquare?: ChessSquare;
    destinationSquare?: ChessSquare;
    draggedPiece?: ChessPiece;
    hoveredSquare?: ChessSquare;
    isDragging: boolean;
    willDeselect: boolean;
}