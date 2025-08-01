import React from 'react';
import SideNavbar from './Navbar/SideNavbar';
import { Outlet } from 'react-router-dom';
import MobileNavbar from './Navbar/mobileNavbar';

const AppOutlet = () => {
  return (
    <>
      <MobileNavbar />
      <SideNavbar />
      <Outlet />
    </>
  );
}

export default AppOutlet;
