export interface ChessBoardConfig {
    board?: ChessBoardBoardConfig;
    square?: ChessBoardSquareConfig;
    piece?: ChessBoardPieceConfig;
    promotionMenu?: ChessBoardPromotionMenuConfig;
    transition?: string;
}
export interface ChessBoardBoardConfig {
    boardColor1?: string;
    boardColor2?: string;
    shadow?: ChessBoardShadowConfig;
}
export interface ChessBoardSquareConfig {
    borderColor?: string;
    borderWidth?: string;
    selectedBackgroundColor?: string;
    legalMoveBackgroundColor?: string;
    legalCaptureBackgroundColor?: string;
    recentMoveBackgroundColor?: string;
    underAttackBackgroundColor?: string;
}
export interface ChessBoardPieceConfig {
    shadow?: ChessBoardShadowConfig;
}
export interface ChessBoardPromotionMenuConfig {
    backdropBackgroundColor?: string;
    shadow?: ChessBoardShadowConfig;
}
export interface ChessBoardShadowConfig {
    enabled?: boolean;
    color?: string;
    radius?: number;
}
