import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import TokenPage from './pages/TokenPage';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token/:symbol" element={<TokenPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
