import React from 'react';

import ChessBoardSquares from './ChessBoardSquares';
import ChessBoardPromotionMenu from './ChessBoardPromotionMenu';

import { ChessColor, ChessMove, ChessPiece, ChessSquare } from '../types';
import { Chess } from '../../node_modules/chess.js/dist/chess';
import { ChessBoardConfig } from '../ChessBoardConfig';

export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess = new Chess();
    promotionMenu: React.RefObject<ChessBoardPromotionMenu> = React.createRef();
    constructor(props: ChessBoardProps) {
        super(props);
        this.state = {
            recent: []
        }
    }

    render() {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
            }}>
                <ChessBoardSquares pieces={this.props.pieces} onMove={this.props.onMove} getLegalMoves={this.props.getLegalMoves} inCheck={this.props.inCheck} getTurn={this.props.getTurn} recent={this.state.recent} config={this.props.config} />
                <ChessBoardPromotionMenu ref={this.promotionMenu} config={this.props.config} />
            </div>
        );
    }

    async promotion(color: ChessColor, file: number) {
        if (!this.promotionMenu.current) {
            return;
        }
        return await this.promotionMenu.current?.openAsync(color, file);
    }

    componentDidMount(): void {
        if (this.props.updatePieces) this.props.updatePieces();
    }
}

interface ChessBoardProps {
    onMove?: (move: ChessMove) => void;
    getLegalMoves?: (square: ChessSquare) => ChessSquare[];
    inCheck?: () => boolean;
    getTurn?: () => ChessColor;
    updatePieces?: () => void;
    pieces: (ChessPiece | undefined)[][];
    config?: ChessBoardConfig;
}

interface ChessBoardState {
    selectedSquare?: ChessSquare;
    recent: ChessSquare[];
}