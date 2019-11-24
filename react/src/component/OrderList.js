import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
// import Modal from '@material-ui/core/Modal';
import SimpleModel from '../utils/SimpleModal';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: `60%`,
    margin: `${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
  },
  orderDesc: {
    textAlign: "left",
    marginBottom: "10px",
    marginTop: "10px"
  },
  orderHead: {
    textAlign: "center"
  },
  title: {
    fontSize: '22px'
  },
  productImg: {
    height: "120px",
    width: "120px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function OrderList(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const onClickOrder = (event) => {
    console.log('event', event);
    props.history.push('/order-detail');
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  return (
    <div>
      <Paper className="padding-left">
        <Grid item xs zeroMinWidth className={classes.orderHead}>
          <Typography noWrap className={classes.title}>My Orders</Typography>
        </Grid>
      </Paper>

      <Paper className="padding-left">
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap>ORDER PLACED</Typography>
            <Typography noWrap>16 July 2019</Typography>
          </Grid>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap>Total</Typography>
            <Typography noWrap>166</Typography>
          </Grid>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap>ORDER # 203-1725931-7770611</Typography>
            <Button variant="contained" onClick={onClickOrder}>
              Order Details
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap> <img src="/images/default-image.png" alt="product img" className={classes.productImg} /></Typography>
          </Grid>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap><span><b> Rules </b> </span></Typography>
            <SimpleModel></SimpleModel>
          </Grid>
          <Grid item xs zeroMinWidth className={classes.orderDesc}>
            <Typography noWrap>product</Typography>
            <Typography noWrap>productTypeDesc</Typography>
            <Typography noWrap>requestedQty</Typography>
            <Typography noWrap>unitPriceAmount</Typography>
          </Grid>
        </Grid>
        <Divider />
        <br></br>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>All items</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Line items details </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs zeroMinWidth className={classes.orderDesc}>
                <Typography noWrap> <img src="/images/default-image.png" alt="product img" className={classes.productImg} /></Typography>
              </Grid>
              <Grid item xs zeroMinWidth className={classes.orderDesc}>
                <Typography noWrap><span><b> 100 </b> </span><br></br><span>Delivered on: 16 September 2019</span></Typography>
              </Grid>
              <Grid item xs zeroMinWidth className={classes.orderDesc}>
                <Typography noWrap>product</Typography>
                <Typography noWrap>productTypeDesc</Typography>
                <Typography noWrap>requestedQty</Typography>
                <Typography noWrap>unitPriceAmount</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </div>
  );
}