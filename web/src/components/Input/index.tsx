import './index.css';

import React from 'react';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = (props: InputProps) => {
  return <input className="input" {...props}></input>;
};
