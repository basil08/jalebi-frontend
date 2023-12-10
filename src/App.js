import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import TokenPage from './pages/TokenPage';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import SwapPage from './pages/Swap';
function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token/:symbol" element={<TokenPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/token/:symbol/:address/:chainId/swap" element={<SwapPage />} />
      </Routes>

      <div className='container'><div className='row'>
        <footer className='text-center'>Made on :coffee: by <a href="https://twitter.com/itbwtsh">itbwtsh</a></footer>
      </div>
      </div>
    </div>

  );
}

export default App;
