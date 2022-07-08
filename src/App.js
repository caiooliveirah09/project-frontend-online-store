import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import productPage from './pages/productPage';
import Categories from './pages/Categories';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ productPage } />
        <Route path="/category/:id" component={ Categories } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
