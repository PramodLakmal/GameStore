import { useParams } from "react-router-dom";
import GameDetails from "../components/GameDetails";

const GameDetailsPage = () => {
  const { id } = useParams();

  return <GameDetails id={id} />;
};

export default GameDetailsPage;
