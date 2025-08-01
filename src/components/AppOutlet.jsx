import React from 'react';
import SideNavbar from './Navbar/SideNavbar';
import { Outlet } from 'react-router-dom';


const AppOutlet = () => {
  return (
    <>
 
      <SideNavbar />
      <Outlet />
    </>
  );
}

export default AppOutlet;
