import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LobbyPage from './components/LobbyPage';
import codeBlockPage from './components/codeBlockPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/codeblock/:id/" element={<codeBlockPage />} />
    </Routes>
  );
}

export default App;
