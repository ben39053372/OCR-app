import './index.scss';

import React from 'react';

import { LoginForm } from './LoginForm';
import { OtherActions } from './OtherActions';

export const Login = () => {
  return (
    <div className="paper">
      <h1 className="text-4xl text-center pb-4">Login</h1>
      <LoginForm />
      <hr />
      <OtherActions />
    </div>
  );
};

export default Login;
