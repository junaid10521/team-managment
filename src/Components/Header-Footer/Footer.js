import React from 'react';

import {CityLogo} from '../ui/icons';

const Footer = () => {
    return (
        <footer className='bck_blue'>
            <div className='footer_logo'>
                <CityLogo 
                    link={true}
                    linkTo='/'
                    width='70px'
                    height='70px' />
            </div>

            <div className='footer_disc'>
                Manchester City 2019. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;