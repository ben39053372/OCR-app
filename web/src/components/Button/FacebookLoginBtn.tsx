import './facebookLoginBtn.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { GrFacebook } from 'react-icons/gr';

export const FacebookLoginBtn = () => {
  const { t } = useTranslation();
  return (
    <button className="btnBase facebookLoginBtn" disabled>
      <GrFacebook size={18} className="mr-2" />
      {t('Login with', { service: t('Facebook') })}
    </button>
  );
};
