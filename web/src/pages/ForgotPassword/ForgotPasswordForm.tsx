import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '../../components/Input';

interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPasswordForm = () => {
  const forgotPasswordForm = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    onSubmit: () => {},
  });
  const { t } = useTranslation();
  return (
    <Input
      id="email"
      placeholder={t('place input', { somethings: t('email') })}
      {...forgotPasswordForm.getFieldProps('email')}></Input>
  );
};
