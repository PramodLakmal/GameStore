import React, { useEffect, useState } from "react";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { getGames, deleteGame } from "../api";
import GameForm from "./GameForm";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getGames();
        setGames(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteGame(id);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Failed to delete game", error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedGame(null);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Game Library</h2>
            <p className="text-sm text-gray-500">Manage your game collection</p>
          </div>
          <button
            onClick={() => {
              setSelectedGame({});
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Game
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Genre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Release Date</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {games.map((game) => (
              <tr key={game.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{game.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{game.genre}</td>
                <td className="px-4 py-3 text-sm text-gray-600">${game.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(game.releaseDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      className="rounded-md border p-2 text-gray-600 hover:bg-gray-50"
                      onClick={() => {
                        setSelectedGame(game);
                        setIsFormOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(game.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">
                {selectedGame?.id ? "Update Game" : "Add New Game"}
              </h3>
              <p className="text-sm text-gray-500">
                Fill in the details below to {selectedGame?.id ? "update the" : "add a new"} game.
              </p>
            </div>
            <GameForm
              game={selectedGame}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameList;