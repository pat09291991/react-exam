import { Fragment, Suspense, useState } from 'react'
import './App.css'
import { Container } from 'reactstrap'
import { Flip, ToastContainer } from 'react-toastify'
import PrivateRoutes from './component/PrivateRoutes.jsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Pages/Login/Login.jsx';
import PageLayout from './component/PageLayout.jsx';
import { isMobile } from 'react-device-detect'
import { InvalidPage } from './component/InvalidPage';
import Roles from './Pages/Roles/Roles';
import Users from './Pages/Users/Users';
import { PageNotDone } from './component/PageNotDone';
import AdminRoutes from './component/AdminRoutes';

function App() {
  const [roles, setRoles] = useState('')

  return (
    <Container fluid className={isMobile ? 'mx-0 px-0 overflow-auto' : 'mx-0 px-0'}>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login setRoles={setRoles} />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminRoutes />}>
              <Route exact path="/users" element={
                <PageLayout title={"Users"} children={<Users />} />
              } />
              <Route exact path="/roles" element={
                <PageLayout title={"Roles"} children={<Roles />} />
              } />
            </Route>
            <Route exact path="/" element={
              <PageLayout title={"Page Under Development"} children={<PageNotDone />} />
            } />
          </Route>
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
