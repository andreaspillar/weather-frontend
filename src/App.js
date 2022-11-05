import logo from './logo.svg';
import './App.css';
import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import {PrivatRoutes} from './PrivatRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={<PrivatRoutes><Dashboard/></PrivatRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
