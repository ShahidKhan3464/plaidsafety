import React from "react";
import SomethingWentWrongPage from "./somethingWentWrong";

const logErrorToMyService = (error, errorInfo) => {
  // add sentry here
  console.error(
    "--------------------From Error Boundary--------------------",
    error,
    "errorInfo",
    errorInfo,
  );
};

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <SomethingWentWrongPage />;
    }

    return this.props.children;
  }
}
