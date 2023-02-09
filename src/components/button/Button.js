import React from "react";

function Button({ setShowSearch, setSearch }) {
  const handleAddCity = () => {
    setShowSearch(false);
    setSearch(null);
  };

  return (
    <button className="add-button" onClick={handleAddCity}>
      +
    </button>
  );
}

export default Button;
