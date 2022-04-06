import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  ProductList,
  Methodology
} from "./";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<ProductList />} />
      <Route path="/Methodology" element={<Methodology />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

export { default as Navigation } from "./Navigation";
export { default as Home } from "./Home";
export { default as ProductList } from "./Products";
export { default as Methodology } from "./Methodology";