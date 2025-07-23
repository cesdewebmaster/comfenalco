import { useEffect } from 'react';
import GlobalContextProvider from "../../../context/GlobalContextProvider"
import { toLocalStoragepageActive } from '../../../utils/functions';

import Header from "../../molecules/header/header"
import MenuOffCanvas from "../../molecules/menu-offcanvas/MenuOffCanvas"
import Footer from "../../molecules/footer/footer"
import BackdropBlur from "../../atoms/backdrop-blur/BackdropBlur"

import './layout.scss';

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {

  useEffect(() => {
    toLocalStoragepageActive();
  }, []);


  return (
    <GlobalContextProvider>
      <Header />
      <MenuOffCanvas />
      <main className="o-main-container">{children}</main>
      <Footer />
      <BackdropBlur />
    </GlobalContextProvider>
  )
}

export default Layout
