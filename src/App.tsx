import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "layout/Layout";
import { Home } from "pages/Home/Home";
import { Search } from "pages/Search/Search";

import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
