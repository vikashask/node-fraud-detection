import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const rules = [
    {
        "name": "offHours",
        "isPassed": true,
        "desc": "Orders placed off hours based on customer’s time-zone (off hours – 11:00 PM to 6:00 am)"

    },
    {
        "name": "outsideUSOrCanada",
        "isPassed": false,
        "desc": "Orders placed outside of United States and Canada"

    },
    {
        "name": "zipcodeDiffernce",
        "isPassed": false,
        "desc": "Order Shipping Address zip code and Payment zip code is different"

    },
    {
        "name": "totalAmountLarge",
        "isPassed": false,
        "desc": "Order total amount is un-usually large"

    },
    {
        "name": "frequentOrders",
        "isPassed": false,
        "desc": "Very frequent orders un-usual from normal customer frequency"
    }
];


export default function SimpleModal() {
    return (
        <div>
            {rules.map((rule) => (
                <div>
                    <Typography title={rule.desc} style={!rule.isPassed ? { color: 'red' } : { color: 'green' }} noWrap>{rule.name}</Typography>
                </div>
            ))}
            
        </div>
    );
}
