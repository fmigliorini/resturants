import React from 'react';
import { Alert } from 'reactstrap';

const ErrorMessage = ({message}) => (
  <Alert color="danger" style={{textAlign: 'center'}}>
    {message}
  </Alert>
);

export default ErrorMessage;
