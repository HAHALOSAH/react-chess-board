import React from 'react';

import ChessBoard from './ChessBoard';
import ChessBoardPromotionMenu from './ChessBoardPromotionMenu';

import { ChessColor, ChessMove, ChessPiece, ChessPieceType, ChessSquare } from '../types';
import { Chess, Square } from '../../node_modules/chess.js/dist/chess';
import { chessSquareToText } from '../util';
import { ChessBoardConfig } from '../ChessBoardConfig';

export default class ChessBoardOTB extends React.Component<ChessBoardProps, ChessBoardState> {
    _chess = new Chess();
    chessBoard: React.RefObject<ChessBoard> = React.createRef();
    constructor(props: ChessBoardProps) {
        super(props);
        this.state = {
            pieces: Array(8).fill([]),
            recent: []
        }

        this.onMove = this.onMove.bind(this);
        this.getLegalMoves = this.getLegalMoves.bind(this);
        this.inCheck = this.inCheck.bind(this);
        this.getTurn = this.getTurn.bind(this);

        this.updatePieces = this.updatePieces.bind(this);
    }

    render() {
        return (
            <div>
                <ChessBoard onMove={this.onMove} getLegalMoves={this.getLegalMoves} inCheck={this.inCheck} getTurn={this.getTurn} updatePieces={this.updatePieces} pieces={this.state.pieces} config={this.props.config} ref={this.chessBoard} />
            </div>
        );
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
                if (this.chessBoard.current) {
                    promotionTo = await this.chessBoard.current.promotion(ChessColor.WHITE, move.to.file);
                    if (!promotionTo) return;
                }
            }
            if (this.state.pieces[move.from.row][move.from.file]?.color == ChessColor.BLACK && move.to.row == 7) {
                // Black pawn promotion
                if (this.chessBoard.current) {
                    promotionTo = await this.chessBoard.current.promotion(ChessColor.BLACK, move.to.file);
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
            this.setState({
                recent: [move.from, move.to]
            });
        } catch (e) {
            // Invalid move, just ignore it
            return;
        }
        this.updatePieces();
    }

    getLegalMoves(square: ChessSquare): ChessSquare[] {
        return this._chess.moves({ square: chessSquareToText(square) as Square, verbose: true }).map(move => {
            return {
                row: 8 - parseInt(move.to[1]),
                file: ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(move.to[0])
            } as ChessSquare;
        });
    }

    inCheck(): boolean {
        return this._chess.inCheck();
    }

    getTurn(): ChessColor {
        return this._chess.turn() == "w" ? ChessColor.WHITE : ChessColor.BLACK;
    }
}

interface ChessBoardProps {
    config?: ChessBoardConfig;
}

interface ChessBoardState {
    selectedSquare?: ChessSquare;
    pieces: (ChessPiece | undefined)[][];
    recent: ChessSquare[];
}