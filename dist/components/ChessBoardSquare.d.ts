import React from 'react';
export default class ChessBoardSquare extends React.Component<ChessBoardSquareProps> {
    render(): JSX.Element;
}
interface ChessBoardSquareProps {
    row: number;
    file: number;
}
export {};
