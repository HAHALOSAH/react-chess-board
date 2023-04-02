import React from 'react';
import { ChessMove, ChessPiece, ChessSquare } from '../types';
import ChessPieceIcon from './ChessPieceIcon';
export default class ChessBoardSquares extends React.Component<ChessBoardSquaresProps, ChessBoardSquaresState> {
    draggedChessPieceStyles: React.CSSProperties;
    draggedChessPiece: React.RefObject<ChessPieceIcon>;
    draggedChessPieceContainer: React.RefObject<HTMLDivElement>;
    chessBoardSquares: React.RefObject<HTMLDivElement>;
    constructor(props: ChessBoardSquaresProps);
    render(): JSX.Element;
    clearSelectedSquare(): void;
    setSelectedSquare(square?: ChessSquare): void;
    onSquareMouseDown(square: ChessSquare): void;
    onMouseDown(e: React.MouseEvent<Element, MouseEvent>): void;
    onMouseUp(): void;
    startDragging(square: ChessSquare): void;
    stopDragging(): void;
    clearDestinationSquare(): void;
    setDestinationSquare(square?: ChessSquare): void;
    onSquareHover(square: ChessSquare): void;
    onMouseMove(e: MouseEvent): void;
    updateDraggedChessPieceLocation(e: MouseEvent): void;
    onMouseOut(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
interface ChessBoardSquaresProps {
    pieces: (ChessPiece | undefined)[][];
    onMove?: (move: ChessMove) => void;
}
interface ChessBoardSquaresState {
    selectedSquare?: ChessSquare;
    destinationSquare?: ChessSquare;
    draggedPiece?: ChessPiece;
    isDragging: boolean;
    willDeselect: boolean;
}
export {};
