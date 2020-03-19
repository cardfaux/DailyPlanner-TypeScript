import React, { Component } from 'react';

type ErrorState = {
  hasError: boolean;
};

class ErrorBoundry extends Component<{}, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(_error: any, _info: any) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry, something went wrong :(</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
