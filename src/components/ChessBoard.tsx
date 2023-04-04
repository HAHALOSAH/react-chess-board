import React from 'react';

import ChessBoardSquares from './ChessBoardSquares';
import ChessBoardPromotionMenu from './ChessBoardPromotionMenu';

import { ChessColor, ChessMove, ChessPiece, ChessPieceType, ChessSquare } from '../types';
import { Chess, Square } from '../../node_modules/chess.js/dist/chess';
import { chessSquareToText } from '../util';

export default class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess = new Chess();
    promotionMenu: React.RefObject<ChessBoardPromotionMenu> = React.createRef();
    constructor(props: {

    }) {
        super(props);
        this.state = {
            pieces: Array(8).fill([])
        }

        this.onClick = this.onClick.bind(this);
        this.onMove = this.onMove.bind(this);
        this.getLegalMoves = this.getLegalMoves.bind(this);
        this.inCheck = this.inCheck.bind(this);
        this.getTurn = this.getTurn.bind(this);
    }

    render() {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
            }} onClick={this.onClick}>
                <ChessBoardSquares pieces={this.state.pieces} onMove={this.onMove} getLegalMoves={this.getLegalMoves} inCheck={this.inCheck} getTurn={this.getTurn} />
                <ChessBoardPromotionMenu ref={this.promotionMenu} />
            </div>
        );
    }

    onClick() {

    }

    updatePieces() {
        this.setState({
            pieces:
                (this._chess.board().map(row => {
                    return row.map(piece => {
                        if (piece == null) return undefined;
                        return {
                            color: piece.color == "w" ? ChessColor.WHITE : ChessColor.BLACK,
                            type: ["p", "n", "b", "r", "q", "k"].indexOf(piece.type)
                        };
                    });
                }) as (ChessPiece | undefined)[][])
        });
    }

    componentDidMount(): void {
        this.updatePieces();
    }

    async onMove(move: ChessMove) {
        var promotionTo: ChessPieceType | undefined = undefined;
        if (this.state.pieces[move.from.row][move.from.file]?.type == ChessPieceType.PAWN) {
            if (this.state.pieces[move.from.row][move.from.file]?.color == ChessColor.WHITE && move.to.row == 0) {
                // White pawn promotion
                if (this.promotionMenu.current) {
                    promotionTo = await this.promotionMenu.current.openAsync(ChessColor.WHITE, move.to.file);
                    if (!promotionTo) return;
                }
            }
            if (this.state.pieces[move.from.row][move.from.file]?.color == ChessColor.BLACK && move.to.row == 7) {
                // Black pawn promotion
                if (this.promotionMenu.current) {
                    promotionTo = await this.promotionMenu.current.openAsync(ChessColor.BLACK, move.to.file);
                    if (!promotionTo) return;
                }
            }
        }
        try {
            this._chess.move({
                from: chessSquareToText(move.from),
                to: chessSquareToText(move.to),
                promotion: typeof promotionTo == 'number' ? ["p", "n", "b", "r", "q", "k"][promotionTo] : undefined
            });
        } catch (e) {
            // Invalid move, just ignore it
            return;
        }
        this.updatePieces();
    }

    getLegalMoves(square: ChessSquare) {
        return this._chess.moves({ square: chessSquareToText(square) as Square, verbose: true }).map(move => {
            return {
                row: 8 - parseInt(move.to[1]),
                file: ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(move.to[0])
            };
        });
    }

    inCheck() {
        return this._chess.inCheck();
    }

    getTurn(): ChessColor {
        return this._chess.turn() == "w" ? ChessColor.WHITE : ChessColor.BLACK;
    }
}

interface ChessBoardProps {

}

interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][]
}