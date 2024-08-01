import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/codeBlockPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/codeblock/:id/" element={<CodeBlockPage/>} />
    </Routes>
  );
}

export default App;
