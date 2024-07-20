import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/log-in' element={<Login />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}