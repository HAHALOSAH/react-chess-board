import React from 'react';
import { ChessPiece } from '../types';
export default class ChessPieceIcon extends React.Component<ChessPieceIconProps> {
    render(): JSX.Element;
}
interface ChessPieceIconProps {
    piece?: ChessPiece;
}
export {};
