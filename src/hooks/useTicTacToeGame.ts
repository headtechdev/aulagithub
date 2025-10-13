import { useState, useEffect, useCallback } from "react";
import {
  createNewGame,
  getGameById,
  joinGame,
  updateGame,
  subscribeToGameUpdates,
} from "@/services/ticTacToeService";
import { Game, Board, PlayerSymbol, Winner, GameStatus } from "@/types/tictactoe";
import { toast } from "sonner";

const calculateWinner = (board: Board): Winner => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((square) => square !== null)) {
    return "Draw";
  }

  return null;
};

interface UseTicTacToeGameProps {
  initialGameId?: string;
  playerId: string; // ID único para o jogador atual (pode ser um ID de sessão)
}

export const useTicTacToeGame = ({ initialGameId, playerId }: UseTicTacToeGameProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetGame = useCallback(() => {
    setGame(null);
    setPlayerSymbol(null);
    setLoading(true);
    setError(null);
  }, []);

  // Load game or create new one
  useEffect(() => {
    const loadOrCreateGame = async () => {
      setLoading(true);
      setError(null);
      if (initialGameId) {
        const existingGame = await getGameById(initialGameId);
        if (existingGame) {
          setGame(existingGame);
          if (existingGame.player_x_id === playerId) {
            setPlayerSymbol("X");
          } else if (existingGame.player_o_id === playerId) {
            setPlayerSymbol("O");
          } else if (!existingGame.player_o_id && existingGame.player_x_id !== playerId) {
            // Join as O if available
            const joinedGame = await joinGame(initialGameId, playerId);
            if (joinedGame) {
              setGame(joinedGame);
              setPlayerSymbol("O");
              toast.success("Você entrou no jogo como O!");
            } else {
              setError("Não foi possível entrar no jogo.");
              toast.error("Não foi possível entrar no jogo.");
            }
          } else {
            setError("Este jogo já está cheio ou você não faz parte dele.");
            toast.error("Este jogo já está cheio ou você não faz parte dele.");
          }
        } else {
          setError("Jogo não encontrado.");
          toast.error("Jogo não encontrado.");
        }
      } else {
        // No initial game ID, user needs to create or join from lobby
        setLoading(false);
      }
      setLoading(false);
    };

    loadOrCreateGame();
  }, [initialGameId, playerId]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (game?.id) {
      const subscription = subscribeToGameUpdates(game.id, (payload) => {
        setGame(payload.new);
        if (payload.new.winner) {
          if (payload.new.winner === "Draw") {
            toast.info("Empate!");
          } else {
            toast.success(`Jogador ${payload.new.winner} venceu!`);
          }
        }
      });

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [game?.id]);

  const makeMove = useCallback(
    async (index: number) => {
      if (!game || !playerSymbol || game.winner || game.status !== "playing") {
        toast.warning("Aguarde o início do jogo ou sua vez.");
        return;
      }

      if (game.current_player !== playerSymbol) {
        toast.warning("Não é a sua vez!");
        return;
      }

      if (game.board[index] !== null) {
        toast.warning("Esta célula já está ocupada!");
        return;
      }

      const newBoard = [...game.board];
      newBoard[index] = playerSymbol;

      const currentWinner = calculateWinner(newBoard);
      const nextPlayer: PlayerSymbol = playerSymbol === "X" ? "O" : "X";
      const newStatus: GameStatus = currentWinner ? "finished" : "playing";

      const updatedGame = await updateGame(
        game.id,
        newBoard,
        nextPlayer,
        currentWinner,
        newStatus,
      );

      if (!updatedGame) {
        setError("Erro ao fazer a jogada.");
        toast.error("Erro ao fazer a jogada.");
      }
    },
    [game, playerSymbol],
  );

  const createGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    const newGame = await createNewGame(playerId);
    if (newGame) {
      setGame(newGame);
      setPlayerSymbol("X");
      toast.success("Jogo criado! Compartilhe o ID para um amigo entrar.");
    } else {
      setError("Erro ao criar o jogo.");
      toast.error("Erro ao criar o jogo.");
    }
    setLoading(false);
  }, [playerId]);

  const joinExistingGame = useCallback(async (gameIdToJoin: string) => {
    setLoading(true);
    setError(null);
    const joinedGame = await joinGame(gameIdToJoin, playerId);
    if (joinedGame) {
      setGame(joinedGame);
      setPlayerSymbol("O");
      toast.success("Você entrou no jogo como O!");
    } else {
      setError("Não foi possível entrar no jogo. Ele pode estar cheio ou não existe.");
      toast.error("Não foi possível entrar no jogo.");
    }
    setLoading(false);
  }, [playerId]);

  return {
    game,
    playerSymbol,
    loading,
    error,
    makeMove,
    createGame,
    joinExistingGame,
    resetGame,
  };
};