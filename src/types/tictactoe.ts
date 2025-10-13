export type PlayerSymbol = "X" | "O";
export type Board = (PlayerSymbol | null)[];
export type GameStatus = "waiting" | "playing" | "finished";
export type Winner = PlayerSymbol | "Draw" | null;

export interface Game {
  id: string;
  created_at: string;
  player_x_id: string | null; // ID do jogador X (pode ser um ID de sessão ou de usuário)
  player_o_id: string | null; // ID do jogador O
  board: Board;
  current_player: PlayerSymbol;
  winner: Winner;
  status: GameStatus;
}