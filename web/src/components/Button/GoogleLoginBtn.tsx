import './GoogleLoginBtn.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';

export const GoogleLoginBtn = () => {
  const { t } = useTranslation();
  return (
    <button className="btnBase googleLoginBtn" disabled>
      <FcGoogle size={18} className="mr-2" />
      {t('Login with', { service: t('Google') })}
    </button>
  );
};
