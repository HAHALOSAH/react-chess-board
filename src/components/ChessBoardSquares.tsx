import React from 'react';

import ChessBoardSquare from './ChessBoardSquare';

export default class ChessBoardSquares extends React.Component {
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
                        return (
                            <ChessBoardSquare row={(i / 8) | 0} file={i % 8} key={i} />
                        );
                    })
                }
            </div>
        );
    }
}