import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import OrderList from './component/OrderList';
import PageNotFound from './component/PageNotFound';
import OrderDetail from './component/OrderDetail';
import Order from './component/Order';
import Header from './component/common/header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <Router>
          <div>
            <Switch>
              <Route path='/' component={Order} exact />
              <Route path='/order-list' component={OrderList} exact />
              <Route path='/order-detail' component={OrderDetail} exact />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </main>
      <footer className="App-footer">
        {/* <img src="/images/footer.png" /> */}
        Footer here
      </footer>
    </div>
  );
}

export default App;
