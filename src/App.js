import React from "react";
import "./App.css";
import { FaWrench } from "react-icons/fa"; // Import the wrench icon

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FaWrench className="wrench-icon" />
        <h1>Hey! This is Arnav Srivastav's Personal Website</h1>
        <p className="tagline">Work In Progress...</p>
      </header>
    </div>
  );
}

export default App;
