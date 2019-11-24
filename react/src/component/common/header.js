import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: `10% 0 0 25%`,
    width: `50%`,
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

export default function Header(props) {

  const onSubmit = (event) => {
    props.history.push('/order-list');
  }

  return (
    <div className="App-header">
      <img onClick={onSubmit} src="/images/logo.jpg" alt="Pepsico" className="logo" />
      <span className="header-title">
        Fraud Analysis
      </span>
      <a href='/' className="header-title">Home</a>
    </div>
  );
}