import React from 'react';

import ChessBoardSquares from './ChessBoardSquares';

export default class ChessBoard extends React.Component {
    constructor(props: {

    }) {
        super(props);
    }

    render() {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
            }}>
                <ChessBoardSquares />
            </div>
        );
    }
}