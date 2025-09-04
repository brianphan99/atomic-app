import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="h-16 flex justify-around items-center bg-white border-t">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/exercises">Exercises</NavLink>
      <NavLink to="/history">History</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </div>
  );
}