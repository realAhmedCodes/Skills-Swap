import React from 'react'

export const Chip = ({ label, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault(); 
    onDelete(); 
  };

  return (
    <div className="chip">
      <span>{label}</span>
      <button onClick={handleDeleteClick}>x</button>
    </div>
  );
};
