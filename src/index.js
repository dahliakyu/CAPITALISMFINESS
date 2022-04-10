import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Data from './pages/Data'
import Bunny from './pages/Bunny'
import Products from './pages/Products'
import Navigation from './components/Navigation'
import Home from './Home'

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Data" element={<Data />} />
      <Route path="/Bunny" element={<Bunny />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
