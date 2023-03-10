import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import FinishOrder from './pages/FinishOrder';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ ProductPage } />
        <Route path="/finish" component={ FinishOrder } />
      </Switch>
    </BrowserRouter>
  );
}
