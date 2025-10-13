"use client";

import React, { useState, useEffect } from "react";
import TicTacToeBoard from "@/components/TicTacToeBoard";
import GameModeSelector from "@/components/GameModeSelector";
import MultiplayerGameLobby from "@/components/MultiplayerGameLobby";
import { useTicTacToeGame } from "@/hooks/useTicTacToeGame";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid'; // Para gerar um ID de jogador único

const TicTacToePage: React.FC = () => {
  const [gameMode, setGameMode] = useState<"vs-ai" | "vs-player" | null>(null);
  const [multiplayerGameId, setMultiplayerGameId] = useState<string | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string>(""); // ID único para o jogador atual

  useEffect(() => {
    // Gera um ID de jogador único para a sessão atual
    let storedPlayerId = localStorage.getItem("tic-tac-toe-player-id");
    if (!storedPlayerId) {
      storedPlayerId = uuidv4();
      localStorage.setItem("tic-tac-toe-player-id", storedPlayerId);
    }
    setPlayerId(storedPlayerId);
  }, []);

  const {
    game,
    playerSymbol,
    loading,
    error,
    makeMove,
    createGame,
    joinExistingGame,
    resetGame: resetMultiplayerGame,
  } = useTicTacToeGame({ initialGameId: multiplayerGameId, playerId });

  const handleSelectMode = (mode: "vs-ai" | "vs-player") => {
    setGameMode(mode);
    if (mode === "vs-player") {
      // Reset multiplayer state when switching to multiplayer
      setMultiplayerGameId(undefined);
      resetMultiplayerGame();
    }
  };

  const handleCreateMultiplayerGame = async () => {
    await createGame();
    // O hook useTicTacToeGame já define o gameId internamente após a criação
    // e atualiza o estado 'game'.
    // Podemos usar o game.id do estado para exibir ao usuário.
  };

  const handleJoinMultiplayerGame = async (id: string) => {
    setMultiplayerGameId(id); // Define o ID para o hook carregar o jogo
    await joinExistingGame(id);
  };

  const handleGameOver = (winner: "X" | "O" | "Draw" | null) => {
    console.log("Game Over! Winner:", winner);
    // Para o modo AI, podemos reiniciar o jogo diretamente
    if (gameMode === "vs-ai") {
      // A lógica de reset já está no TicTacToeBoard para o modo AI
    } else if (gameMode === "vs-player") {
      // Para multiplayer, o reset é mais complexo, talvez voltar para o lobby
      toast.info("Jogo multiplayer finalizado. Voltando ao lobby.");
      setMultiplayerGameId(undefined);
      resetMultiplayerGame();
    }
  };

  // Renderiza o tabuleiro do jogo da velha para ambos os modos
  const renderTicTacToeBoard = () => {
    if (gameMode === "vs-ai") {
      return <TicTacToeBoard mode="vs-ai" onGameOver={handleGameOver} />;
    } else if (gameMode === "vs-player" && game && playerSymbol) {
      // Renderiza o tabuleiro multiplayer
      return (
        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold mb-6">
            {game.winner
              ? game.winner === "Draw"
                ? "Empate!"
                : `Vencedor: ${game.winner}`
              : `Próximo Jogador: ${game.current_player}`}
          </h2>
          {game.status === "waiting" && (
            <p className="text-xl text-gray-600 mb-4">
              Aguardando outro jogador... ID do Jogo:{" "}
              <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {game.id}
              </span>
            </p>
          )}
          <TicTacToeBoard
            mode="vs-player"
            onGameOver={handleGameOver}
            // Passa as props específicas do multiplayer para o tabuleiro
            // O TicTacToeBoard precisaria ser adaptado para receber essas props
            // Por enquanto, ele usa seu próprio estado interno, mas para multiplayer
            // ele precisaria ser um componente "dumb" que recebe o board e a função de move
            // Para simplificar, vamos manter a lógica de multiplayer no hook e apenas
            // renderizar o tabuleiro com as informações do 'game'
            board={game.board}
            currentPlayer={game.current_player}
            onCellClick={(index) => makeMove(index)}
            disabled={game.winner !== null || game.current_player !== playerSymbol}
          />
          <Button onClick={() => handleGameOver(null)} className="mt-6 bg-red-500 hover:bg-red-600 text-white">
            Sair do Jogo
          </Button>
        </div>
      );
    }
    return null;
  };

  // Adaptação do TicTacToeBoard para receber props de multiplayer
  // Para evitar reescrever o TicTacToeBoard inteiro, vamos criar um wrapper simples
  const MultiplayerTicTacToeBoardWrapper: React.FC<{
    game: Game;
    playerSymbol: PlayerSymbol;
    onCellClick: (index: number) => void;
  }> = ({ game, playerSymbol, onCellClick }) => {
    const renderSquare = (index: number) => (
      <Button
        variant="outline"
        className={cn(
          "w-24 h-24 text-5xl font-bold flex items-center justify-center",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          game.board[index] === "X" && "text-blue-600",
          game.board[index] === "O" && "text-red-600",
          game.winner && "cursor-not-allowed",
        )}
        onClick={() => onCellClick(index)}
        disabled={
          !!game.board[index] ||
          !!game.winner ||
          game.current_player !== playerSymbol ||
          game.status !== "playing"
        }
      >
        {game.board[index]}
      </Button>
    );

    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-6">
          {game.winner
            ? game.winner === "Draw"
              ? "Empate!"
              : `Vencedor: ${game.winner}`
            : game.status === "waiting"
            ? "Aguardando outro jogador..."
            : `Sua vez: ${playerSymbol} | Próximo Jogador: ${game.current_player}`}
        </h2>
        {game.status === "waiting" && (
          <p className="text-xl text-gray-600 mb-4">
            Compartilhe o ID do Jogo:{" "}
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {game.id}
            </span>
          </p>
        )}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
        </div>
        <Button onClick={() => handleGameOver(null)} className="bg-red-500 hover:bg-red-600 text-white">
          Sair do Jogo
        </Button>
      </div>
    );
  };


  if (!playerId) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
          Jogo da Velha
        </h1>
        <p className="text-xl text-gray-600">Carregando ID do jogador...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
        Jogo da Velha
      </h1>

      {!gameMode ? (
        <GameModeSelector onSelectMode={handleSelectMode} />
      ) : gameMode === "vs-ai" ? (
        <TicTacToeBoard mode="vs-ai" onGameOver={handleGameOver} />
      ) : (
        // Multiplayer mode
        <>
          {loading && !game ? (
            <p className="text-xl text-gray-600">Carregando jogo multiplayer...</p>
          ) : error ? (
            <p className="text-xl text-red-600">{error}</p>
          ) : game && playerSymbol ? (
            <MultiplayerTicTacToeBoardWrapper
              game={game}
              playerSymbol={playerSymbol}
              onCellClick={makeMove}
            />
          ) : (
            <MultiplayerGameLobby
              onCreateGame={handleCreateMultiplayerGame}
              onJoinGame={handleJoinMultiplayerGame}
              playerId={playerId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TicTacToePage;