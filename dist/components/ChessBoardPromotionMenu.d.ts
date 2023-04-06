import React from 'react';
import { ChessColor, ChessPieceType } from '../types';
import { ChessBoardConfig } from '../ChessBoardConfig';
export default class ChessBoardPromotionMenu extends React.Component<ChessBoardPromotionMenuProps, ChessBoardPromotionMenuState> {
    backdrop: React.RefObject<HTMLDivElement>;
    callbacks: ((result?: ChessPieceType) => void)[];
    constructor(props: ChessBoardPromotionMenuProps);
    render(): JSX.Element;
    onClick(): void;
    close(): void;
    onSquareHover(square: number): void;
    onSquareClick(square: number): void;
    onMouseOut(): void;
    returnCallbacks(result?: ChessPieceType): void;
    open(color: ChessColor, file: number, callback: (result?: ChessPieceType) => void): void;
    openAsync(color: ChessColor, file: number): Promise<ChessPieceType | undefined>;
}
interface ChessBoardPromotionMenuProps {
    config?: ChessBoardConfig;
}
interface ChessBoardPromotionMenuState {
    isOpen: boolean;
    color?: ChessColor;
    file?: number;
    selected?: number;
}
export {};
