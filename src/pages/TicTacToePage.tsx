"use client";

import React, { useState } from "react";
import TicTacToeBoard from "@/components/TicTacToeBoard";
import GameModeSelector from "@/components/GameModeSelector";

const TicTacToePage: React.FC = () => {
  const [gameMode, setGameMode] = useState<"vs-ai" | "vs-player" | null>(null);

  const handleSelectMode = (mode: "vs-ai" | "vs-player") => {
    setGameMode(mode);
  };

  const handleGameOver = (winner: "X" | "O" | "Draw" | null) => {
    // Lógica para lidar com o fim do jogo, se necessário
    // Por exemplo, mostrar um modal de resultado ou voltar para a seleção de modo
    console.log("Game Over! Winner:", winner);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
        Jogo da Velha
      </h1>

      {!gameMode ? (
        <GameModeSelector onSelectMode={handleSelectMode} />
      ) : (
        <TicTacToeBoard mode={gameMode} onGameOver={handleGameOver} />
      )}

      {gameMode === "vs-player" && (
        <p className="text-lg text-gray-600 mt-8 text-center max-w-2xl">
          Para o modo "Jogar contra Outro Jogador (Web)", você precisará de um backend configurado para gerenciar as partidas em tempo real. Sugiro usar o Supabase para isso!
        </p>
      )}
    </div>
  );
};

export default TicTacToePage;