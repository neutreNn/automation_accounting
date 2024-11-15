import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GearTable from './components/GearTable';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GearTable />} />
        <Route path="/statistics" element={<p>Статистика</p>} />
        <Route path="/logs" element={<p>Логи</p>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
