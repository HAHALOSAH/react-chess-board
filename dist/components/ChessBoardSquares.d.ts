import React from 'react';
import { ChessColor, ChessMove, ChessPiece, ChessSquare } from '../types';
import ChessPieceIcon from './ChessPieceIcon';
import { ChessBoardConfig } from '../ChessBoardConfig';
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
    updateLegalMoves(square: ChessSquare): void;
}
interface ChessBoardSquaresProps {
    pieces: (ChessPiece | undefined)[][];
    recent: ChessSquare[];
    onMove?: (move: ChessMove) => void;
    getLegalMoves?: (square: ChessSquare) => ChessSquare[];
    inCheck?: () => boolean;
    getTurn?: () => ChessColor;
    config?: ChessBoardConfig;
}
interface ChessBoardSquaresState {
    selectedSquare?: ChessSquare;
    destinationSquare?: ChessSquare;
    draggedPiece?: ChessPiece;
    hoveredSquare?: ChessSquare;
    isDragging: boolean;
    willDeselect: boolean;
    legalMoves: ChessSquare[];
}
export {};
