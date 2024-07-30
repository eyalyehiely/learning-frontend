import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages
import CodeBlockPage from './components/codeBlockPage';
import LobbyPage from './components/LobbyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/codeblock/:id" element={<CodeBlockPage />} />
    </Routes>
  );
}

export default App;
