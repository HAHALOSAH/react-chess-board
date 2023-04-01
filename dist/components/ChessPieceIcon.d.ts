import React from 'react';
import { ChessColor, ChessPiece } from '../types';
export default class ChessPieceIcon extends React.Component<ChessPieceIconProps> {
    render(): JSX.Element;
}
interface ChessPieceIconProps {
    piece?: ChessPiece;
    color?: ChessColor;
}
export {};
