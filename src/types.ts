export enum ChessColor {
    WHITE = 0,
    BLACK = 1
}

export enum ChessPieceType {
    PAWN = 0,
    KNIGHT = 1,
    BISHOP = 2,
    ROOK = 3,
    QUEEN = 4,
    KING = 5
}

export interface ChessPiece {
    color: ChessColor,
    type: ChessPieceType
}

export interface ChessSquare {
    row: number;
    file: number;
}

export interface ChessMove {
    from: ChessSquare;
    to: ChessSquare;
    promotion?: ChessPieceType;
}