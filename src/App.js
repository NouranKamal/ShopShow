import logo from './logo.svg';
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import MasterLayout from '../src/components/MasterLayout/MasterLayout';
import Home from'./components/Home/Home';
import Brands from './components/Brands/Brands';
import Product from './components/Product/Product';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Cart from './components/Cart/Cart';
import Category from './components/Category/Category';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from '../src/context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import CartContextProvider from './context/cartContext'
import { ToastContainer} from 'react-toastify';
import WishList from '../src/components/WishList/WishList';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders'
const router =createBrowserRouter([
  {path:'',element:<MasterLayout/> , children:[
    {path:'',element: <ProtectedRoute> <Signin/> </ProtectedRoute> },
    {path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'brands',element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'product',element: <ProtectedRoute> <Product/> </ProtectedRoute>},
    {path:'category',element: <ProtectedRoute> <Category/> </ProtectedRoute>},
    {path:'cart',element:  <Cart/> },
    {path:'details/:id',element:<ProtectedRoute> <Details/> </ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute> <CheckOut/> </ProtectedRoute>},
    {path:'allorders',element: <AllOrders/> },
    {path:'forgotPassword',element:<ForgotPassword/>},
    {path:'resetpassword',element:<ResetPassword/>},
    {path:'signin',element:<Signin/>},
    {path:'signup',element:<Signup/>},
    {path:'*',element:<Notfound/>},
  ]}
])

function App() {
  return (
    
   <UserContextProvider>
    <CartContextProvider> 
   <RouterProvider router={router}></RouterProvider>
   <ToastContainer theme='colored'/>
   </CartContextProvider>
   </UserContextProvider>
   
  );
}

export default App;
