import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button className="btn btn-xl btn-outline px-8" onClick={handleBackClick}>
      Back
    </button>
  );
};

export default BackButton;
