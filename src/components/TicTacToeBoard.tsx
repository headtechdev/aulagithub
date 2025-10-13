"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Player = "X" | "O";
type Board = (Player | null)[];

const calculateWinner = (board: Board): Player | "Draw" | null => {
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

interface TicTacToeBoardProps {
  mode: "vs-ai" | "vs-player";
  onGameOver?: (winner: Player | "Draw" | null) => void;
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({ mode, onGameOver }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    toast.info("Jogo reiniciado!");
  }, []);

  useEffect(() => {
    if (winner) {
      if (winner === "Draw") {
        toast.info("Empate!");
      } else {
        toast.success(`Jogador ${winner} venceu!`);
      }
      onGameOver?.(winner);
    }
  }, [winner, onGameOver]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winner) {
        return;
      }

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, winner],
  );

  // AI Logic (Minimax for optimal play)
  const findBestMove = useCallback((currentBoard: Board, player: Player): number => {
    const opponent: Player = player === "X" ? "O" : "X";

    const minimax = (boardState: Board, isMaximizingPlayer: boolean): number => {
      const currentWinner = calculateWinner(boardState);

      if (currentWinner === player) return 10;
      if (currentWinner === opponent) return -10;
      if (currentWinner === "Draw") return 0;

      const availableMoves = boardState
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null) as number[];

      if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (const move of availableMoves) {
          const newBoardState = [...boardState];
          newBoardState[move] = player;
          const score = minimax(newBoardState, false);
          bestScore = Math.max(bestScore, score);
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (const move of availableMoves) {
          const newBoardState = [...boardState];
          newBoardState[move] = opponent;
          const score = minimax(newBoardState, true);
          bestScore = Math.min(bestScore, score);
        }
        return bestScore;
      }
    };

    let bestMove = -1;
    let bestScore = -Infinity;
    const availableMoves = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    for (const move of availableMoves) {
      const newBoardState = [...currentBoard];
      newBoardState[move] = player;
      const score = minimax(newBoardState, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }, []);

  useEffect(() => {
    if (mode === "vs-ai" && currentPlayer === "O" && !winner) {
      const aiMove = findBestMove(board, "O");
      if (aiMove !== -1) {
        const timer = setTimeout(() => handleCellClick(aiMove), 500); // Delay for AI move
        return () => clearTimeout(timer);
      }
    }
  }, [board, currentPlayer, mode, winner, handleCellClick, findBestMove]);

  const renderSquare = (index: number) => (
    <Button
      variant="outline"
      className={cn(
        "w-24 h-24 text-5xl font-bold flex items-center justify-center",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        board[index] === "X" && "text-blue-600",
        board[index] === "O" && "text-red-600",
        winner && "cursor-not-allowed",
      )}
      onClick={() => handleCellClick(index)}
      disabled={!!board[index] || !!winner || (mode === "vs-ai" && currentPlayer === "O")}
    >
      {board[index]}
    </Button>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-6">
        {winner
          ? winner === "Draw"
            ? "Empate!"
            : `Vencedor: ${winner}`
          : `Próximo Jogador: ${currentPlayer}`}
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white">
        Reiniciar Jogo
      </Button>
    </div>
  );
};

export default TicTacToeBoard;