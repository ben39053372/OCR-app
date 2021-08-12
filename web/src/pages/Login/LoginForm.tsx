import { useFormik } from 'formik';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

interface LoginFormValues {
  email: string;
  password: string;
}

const validate = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  // email
  const emailFormat =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!values.email) {
    errors.email = 'Required';
  } else if (!emailFormat.test(values.email)) {
    errors.email = i18next.t('Invalid email address');
  }

  // password
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = i18next.t('Must be characters or more', { length: 8 });
  }

  return errors;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const loginForm = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSignInClick = () => {
    history.push('/');
  };

  return (
    <form onSubmit={loginForm.handleSubmit}>
      <Label>{t('email')}</Label>
      <Input
        id="email"
        type="email"
        placeholder={t('place input', { somethings: t('email') })}
        {...loginForm.getFieldProps('email')}
      />

      {/* error message */}
      {loginForm.touched.email && (
        <div className="error">{loginForm.errors.email}</div>
      )}

      <div className="pt-2" />

      <Label>{t('password')}</Label>
      <Input
        id="password"
        type="password"
        placeholder={t('place input', { somethings: t('password') })}
        {...loginForm.getFieldProps('password')}
      />

      {/* error message */}
      {loginForm.touched.password && (
        <div className="error">{loginForm.errors.password}</div>
      )}

      <div className="actions">
        <Link className="textButton" to="/forgotPassword">
          {t('Forgot Password')}?
        </Link>
        <Button onClick={handleSignInClick} variant="primary" type="submit">
          {t('Sign In')}
        </Button>
      </div>
    </form>
  );
};
