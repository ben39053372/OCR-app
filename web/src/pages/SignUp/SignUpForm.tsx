import { useFormik } from 'formik';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

interface SignUpFormValues {
  email: string;
  name: string;
  phone: string;
  password: string;
}

const validate = (values: SignUpFormValues) => {
  const errors: Partial<SignUpFormValues> = {};

  // email
  const emailFormat =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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

  // Name
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 20) {
    errors.name = 'too large';
  }

  // phone
  const phoneFormat = /^[0-9]{8}$|^852[0-9]{8}$|^\+852[0-9]{8}$/;
  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!phoneFormat.test(values.phone)) {
    errors.phone = i18next.t('Invalid phone');
  }

  return errors;
};

export const SignUpForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const loginForm = useFormik<SignUpFormValues>({
    initialValues: {
      email: '',
      name: '',
      phone: '',
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
      <Label className="asd">{t('email')}</Label>
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

      <Label>{t('Name')}</Label>
      <Input
        id="name"
        type="text"
        placeholder={t('place input', { somethings: t('name') })}
        {...loginForm.getFieldProps('name')}
      />

      {/* error message */}
      {loginForm.touched.email && (
        <div className="error">{loginForm.errors.name}</div>
      )}

      <div className="pt-2" />

      <Label>{t('phone')}</Label>
      <Input
        id="phone"
        type="text"
        placeholder={t('place input', { somethings: t('phone') })}
        {...loginForm.getFieldProps('phone')}
      />

      {/* error message */}
      {loginForm.touched.email && (
        <div className="error">{loginForm.errors.phone}</div>
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
        <Link className="textButton" to="/login">
          {t('I have account')}
        </Link>
        <Button onClick={handleSignInClick} variant="primary" type="submit">
          {t('Sign In')}
        </Button>
      </div>
    </form>
  );
};
