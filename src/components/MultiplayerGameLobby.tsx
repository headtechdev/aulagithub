import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWaitingGames } from "@/services/ticTacToeService";
import { Game } from "@/types/tictactoe";
import { toast } from "sonner";
import { Loader2, PlusCircle, LogIn } from "lucide-react";

interface MultiplayerGameLobbyProps {
  onCreateGame: () => void;
  onJoinGame: (gameId: string) => void;
  playerId: string;
}

const MultiplayerGameLobby: React.FC<MultiplayerGameLobbyProps> = ({
  onCreateGame,
  onJoinGame,
  playerId,
}) => {
  const [waitingGames, setWaitingGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [joinGameId, setJoinGameId] = useState("");

  const fetchWaitingGames = useCallback(async () => {
    setLoadingGames(true);
    const games = await getWaitingGames();
    setWaitingGames(games.filter(game => game.player_x_id !== playerId)); // Filter out games created by current player
    setLoadingGames(false);
  }, [playerId]);

  useEffect(() => {
    fetchWaitingGames();
    const interval = setInterval(fetchWaitingGames, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchWaitingGames]);

  const handleJoinGameClick = () => {
    if (joinGameId.trim()) {
      onJoinGame(joinGameId.trim());
    } else {
      toast.error("Por favor, insira um ID de jogo.");
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Criar ou Entrar em um Jogo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Button onClick={onCreateGame} className="w-full md:w-auto px-8 py-4 text-lg bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-3 h-6 w-6" /> Criar Novo Jogo
            </Button>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="px-4 text-gray-500 dark:text-gray-400">OU</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <Input
                type="text"
                placeholder="ID do Jogo para Entrar"
                value={joinGameId}
                onChange={(e) => setJoinGameId(e.target.value)}
                className="flex-grow p-3 text-lg"
              />
              <Button onClick={handleJoinGameClick} className="w-full md:w-auto px-8 py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white">
                <LogIn className="mr-3 h-6 w-6" /> Entrar no Jogo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Jogos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingGames ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-3 text-lg text-gray-600">Carregando jogos...</span>
            </div>
          ) : waitingGames.length === 0 ? (
            <p className="text-center text-gray-500 text-lg p-8">Nenhum jogo disponível no momento. Crie um novo!</p>
          ) : (
            <div className="space-y-4">
              {waitingGames.map((game) => (
                <div
                  key={game.id}
                  className="flex justify-between items-center p-4 border rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <span className="font-medium text-lg">Jogo ID: {game.id.substring(0, 8)}...</span>
                  <Button onClick={() => onJoinGame(game.id)} variant="secondary">
                    Entrar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiplayerGameLobby;