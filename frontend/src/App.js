import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import DetailPage from './components/DetailPage';
import { Toaster } from './components/ui/toaster';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/:lang" element={<Portfolio />} />
          <Route path="/:lang/detail/:type/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
