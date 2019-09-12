import React from 'react';
import Header from '../Components/Header-Footer/Header';
import Footer from '../Components/Header-Footer/Footer';

const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;