import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import NewsPage from './pages/News/NewsPage';
import SendPage from './pages/Send/SendPage';
import GivePage from './pages/Complient/GivePage';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/send" element={<SendPage />} />
           <Route path="/predict" element={<GivePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;