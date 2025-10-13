"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Cpu } from "lucide-react";

interface GameModeSelectorProps {
  onSelectMode: (mode: "vs-ai" | "vs-player") => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-foreground mb-4">Escolha o Modo de Jogo</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Button
          onClick={() => onSelectMode("vs-ai")}
          className="px-8 py-4 text-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
        >
          <Cpu className="mr-3 h-6 w-6" /> Jogar contra a IA
        </Button>
        <Button
          onClick={() => onSelectMode("vs-player")}
          className="px-8 py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
        >
          <Users className="mr-3 h-6 w-6" /> Jogar contra Outro Jogador (Web)
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        O modo "Jogar contra Outro Jogador (Web)" requer configuração de backend para funcionar.
      </p>
    </div>
  );
};

export default GameModeSelector;