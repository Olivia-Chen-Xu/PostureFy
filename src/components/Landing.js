import React from 'react';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained" component={Link} to='/home'>Get Started</Button>
        </div>
    );
};

export default Landing;