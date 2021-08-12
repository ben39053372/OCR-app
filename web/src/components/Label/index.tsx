import './index.css';

import React from 'react';

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;
  return <label className={['label', className].join(' ')} {...rest}></label>;
};
