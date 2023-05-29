import './App.css';
import Home from './screens/Home';
import Login from './components/Login ';
import Signup from './screens/Signup';
// import'../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import MyOrder from './screens/MyOrder';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { CartProvider } from './components/ContextReducer';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}> </Route>
            <Route exact path='/login' element={<Login />}> </Route>
            <Route exact path='/CreateUser' element={<Signup />}> </Route>
            <Route exact path='/myOrder' element={<MyOrder />}> </Route>

          </Routes>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
