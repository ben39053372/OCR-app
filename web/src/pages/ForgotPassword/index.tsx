import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="paper space-y-6 > *">
      <h1>{t('Forgot Password')}</h1>
      <p className="text-red-500">
        {t('You will receive an email with instructions.')}
      </p>
      <ForgotPasswordForm />
      <div className="flex flex-row justify-between items-center">
        <Link className="textButton" to="/login">
          {t('Back')}
        </Link>
        <Button type="submit" variant="primary">
          {t('Submit')}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
