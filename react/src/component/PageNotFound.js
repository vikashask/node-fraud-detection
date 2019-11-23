import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: `10% 0 0 25%`,
    width:`50%`,
    textAlign: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  }
});

export default function PageNotFound(props){
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  const goToHome = (event) =>{
    props.history.push('/')
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="h5" component="h2">
          Page not found
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToHome}>Go to Home</Button>
      </CardActions>
    </Card>
  );
}