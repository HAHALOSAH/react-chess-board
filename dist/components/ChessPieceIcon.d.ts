import React from 'react';
import { ChessPiece } from '../types';
import { ChessBoardConfig } from '../ChessBoardConfig';
export default class ChessPieceIcon extends React.Component<ChessPieceIconProps> {
    render(): JSX.Element;
}
interface ChessPieceIconProps {
    piece?: ChessPiece;
    config?: ChessBoardConfig;
}
export {};
