import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import { Login } from './Login';
import { Pagenotfound } from './Pagenotfound';
import Menu from './Menu';
import { Navigate } from 'react-router-dom';
import { Register } from './Register';
import { textDanger } from './style/CustomStyles';
import draw from "./assets/draw.png"
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './style/theme';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createContext } from 'react';
import AuthWrapper, { AuthContext } from './context/AuthContetxt';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import Bookedit from './editbooks/Bookedit';
import AddBook from './editbooks/AddBook';
import EditBook from './editbooks/EditBook';
import { RoutePaths } from './utils/enum';
import User from './User';
import EditUser from './EditUser';
import Cart from './cart';
import { Cartwrapper } from './context/CartContext';


function RoutesComponent() {
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);
  const Redirect = <Navigate to={RoutePaths.Login} />;
  const data = Cookies?.get("userInfo");
  console.log(userContext.user);
  const userInfo = JSON.parse(data || '{}'); // added a fallback in case data is null or undefined

  return (
    <>
      <div className="mainlink">
        <Link className="link" style={{ textDanger }} to="/">Login</Link>
        <Link className="link" style={{ textDanger }} to="/Search">Search</Link>
        <Link className="link" style={{ textDanger }} to="/Books">Books</Link>
        <Link className="link" style={{ textDanger }} to="/Edit">Edit</Link>
        <Link className="link" style={{ textDanger }} to="/User">User</Link>
        <Link className="link" style={{ textDanger }} to="/Cart">Cart</Link>
        <Link className="link" style={{ textDanger }} to="/Registration">Registration</Link>
        <img src={draw} alt="react" height={20} width={150} style={{ float: "left", marginTop: 6 }} />
      </div>

      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Search" element={<Homepage />} />
        {/* <Route path="/Books" element={userInfo.email ? <Menu /> : <>{navigate("/")}</>} /> */}
        <Route path="/Books" element={userInfo.email ? <Menu /> : <Navigate to="/" />} />
        <Route path="/Edit" element={<Bookedit />} />
        <Route path="/Add" element={<AddBook />} />
        {/* <Route path="/Edit/:id" element={<AddBook />} /> */}
        <Route path="/edit/:id" element={<AddBook />} />
        <Route path="/Registration" element={<Register />} />
        <Route path="/user" element={<User />} />
         <Route path="/edituser" element={<EditUser />} />
         <Route path="/edit-user/:id" component={<EditUser/>} />
        <Route path="/Registration" element={<Register />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="*" element={<Pagenotfound />} />
        {/* <Route
        exact
        path={RoutePaths.User}
        element={AuthContext.user.id ? <User /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditUser}
        element={AuthContext.user.id ? <EditUser /> : Redirect}
      /> */}
      </Routes>
    </>
  );
}
function App() {

  return (
    <ThemeProvider theme={theme}>
     
        <BrowserRouter>
          <ToastContainer />
          <>
          <AuthWrapper>
         
          <RoutesComponent />
          
            </AuthWrapper>
          </>
        </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;