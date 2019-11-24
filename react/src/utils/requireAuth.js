import React from 'react';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      // if (!this.props.isAuthenticated) {
        if(!localStorage.getItem('token')){
        // this.props.addFlashMessage({
        //   type: 'error',
        //   text: 'You need to login to access this page'
        // });
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      // if (!nextProps.isAuthenticated) {
        if(!localStorage.getItem('token')){
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  // function mapStateToProps(state) {
  //   return {
  //     isAuthenticated: state.auth.isAuthenticated
  //   };
  // }

  // return connect(mapStateToProps)(Authenticate);
  return Authenticate;
}
