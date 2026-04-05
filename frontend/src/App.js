import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <Portfolio />
      <Toaster />
    </div>
  );
}

export default App;
