import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: `100%`

    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: 'white',
        width: `100%`,
    },
    width: {
        width: `80%`,
        // backgroundColor: 'white',        
    }
}));

export default function Order(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {

        setValue(event.target.value);
        console.log("--------sdasdsa");
        console.log("--------", event.target.value);
    };

    const onSubmit = (event) => {
        console.log("value----",value);
        props.history.push('/order-list');
    }
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div className={classes.width}>
                <TextField
                    id="outlined-multiline-static"
                    label="Order from here"
                    multiline
                    rows="10"
                    onChange={handleChange}
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="outlined" size="medium" onClick={onSubmit} color="primary" className={classes.margin}>
                    Post Order
                </Button>
            </div>
        </form>
    );
}  
