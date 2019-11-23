import React from 'react';
import TextFieldGroup from '../utils/TextFieldGroup';

import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

const message = `Order Details`;

class OrderDetail extends React.Component { 
    constructor(prpos){
        super(prpos);
        this.state = {
            order:'',
        }
        // this.onChange = this.onChange.bind(this);
    }
   
    render = () => {
        return(
        <div className="container">
            <Paper>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                    <Typography  variant="h5" noWrap>{message}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <p>
                <span>
                    Ordered On Mon, Oct 28th '19
                </span>
                </p>
            </Paper>
            </div>
        );
    }
}

export default OrderDetail;