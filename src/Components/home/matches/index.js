import React from 'react';

import {Tag} from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
    return (
        <div className='home_matches_wrapper'>
            <div className='container'>
                {/* Tag Matches */}
                <Tag 
                bck="#0e1731"
                color="#ffffff"
                size="50px">MATCHES</Tag>

                {/* Tag Blocks of different matches */}
                    <Blocks />

                {/* Tag see more matches */}
                <Tag
                     bck="#ffffff"
                     color="#0e1731"
                     size="22px"
                     link={true}
                     linkTo='/the_team'
                >See more matches</Tag>
            </div>
        </div>  
    );
};

export default MatchesHome;