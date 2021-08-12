import './index.css';

import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary';
}

export const Button = (props: ButtonProps) => {
  const { className, ...rest } = props;
  return (
    <button
      className={`btnBase ${className} ${props.variant}`}
      {...rest}></button>
  );
};
