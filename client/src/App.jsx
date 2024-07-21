import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdatedProduct from './pages/UpdateProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/log-in' element={<Login />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/update-product/:productId' element={<UpdatedProduct />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}