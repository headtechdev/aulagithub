import { supabase } from "@/lib/supabaseClient";
import { Game, Board, PlayerSymbol, GameStatus, Winner } from "@/types/tictactoe";

const TABLE_NAME = "games";

export const createNewGame = async (playerXId: string): Promise<Game | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      player_x_id: playerXId,
      board: Array(9).fill(null),
      current_player: "X",
      winner: null,
      status: "waiting",
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar novo jogo:", error);
    return null;
  }
  return data as Game;
};

export const getGameById = async (gameId: string): Promise<Game | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", gameId)
    .single();

  if (error) {
    console.error("Erro ao buscar jogo:", error);
    return null;
  }
  return data as Game;
};

export const getWaitingGames = async (): Promise<Game[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("status", "waiting")
    .is("player_o_id", null); // Apenas jogos onde o player O ainda não entrou

  if (error) {
    console.error("Erro ao buscar jogos em espera:", error);
    return [];
  }
  return data as Game[];
};

export const joinGame = async (gameId: string, playerOId: string): Promise<Game | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ player_o_id: playerOId, status: "playing" })
    .eq("id", gameId)
    .is("player_o_id", null) // Garante que só pode entrar se player_o_id for null
    .select()
    .single();

  if (error) {
    console.error("Erro ao entrar no jogo:", error);
    return null;
  }
  return data as Game;
};

export const updateGame = async (
  gameId: string,
  newBoard: Board,
  nextPlayer: PlayerSymbol,
  winner: Winner,
  status: GameStatus,
): Promise<Game | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      board: newBoard,
      current_player: nextPlayer,
      winner: winner,
      status: status,
    })
    .eq("id", gameId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar jogo:", error);
    return null;
  }
  return data as Game;
};

export const subscribeToGameUpdates = (
  gameId: string,
  callback: (payload: { new: Game }) => void,
) => {
  return supabase
    .channel(`game:${gameId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: TABLE_NAME,
        filter: `id=eq.${gameId}`,
      },
      callback,
    )
    .subscribe();
};