import { useNavigate } from "react-router-dom";
import { MovieContex } from "./contex/MovieContex";
import { useContext } from "react";

const BackButton = () => {
  const { position, setPage, setCurrentList, userPosition } = useContext(MovieContex);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
    setCurrentList(userPosition.currentList);
    setPage(userPosition.page);
  };

  return (
    <button className="btn btn-xl btn-outline px-8" onClick={handleBackClick}>
      Back
    </button>
  );
};

export default BackButton;
