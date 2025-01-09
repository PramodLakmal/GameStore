import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getGameById } from "../api";

const GameDetails = ({ id }) => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await getGameById(id);
        setGame(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{game.name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Genre</label>
          <p className="text-sm text-gray-600">{game.genre}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Price</label>
          <p className="text-sm text-gray-600">${game.price.toFixed(2)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Release Date</label>
          <p className="text-sm text-gray-600">
            {new Date(game.releaseDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;