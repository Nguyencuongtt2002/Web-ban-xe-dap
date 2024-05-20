import React from 'react';
import './App.css';
import SideBar from './Layout/SideBar';
import { Outlet } from 'react-router-dom';
import MenuTop from './Layout/MenuTop';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
function App() {
  const user = useSelector((state) => state.user.account);
  return (
    <>
      <div id="wrapper">
        <SideBar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <MenuTop />
            {user?.account?.Quyen_ID === 2 || !user?.account?.HoTen ? (
              <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                  You don't have permisson to acess this route .
                </p>
              </Alert>
            ) : (
              <div className="container-fluid">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
