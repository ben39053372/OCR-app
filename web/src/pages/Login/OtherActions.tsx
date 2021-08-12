import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { FacebookLoginBtn } from '../../components/Button/FacebookLoginBtn';
import { GoogleLoginBtn } from '../../components/Button/GoogleLoginBtn';

export const OtherActions = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleSignUpClick = () => {
    history.push('/signUp');
  };

  return (
    <div className="otherActions">
      <Button onClick={handleSignUpClick} variant="primary">
        {t('Register')}
      </Button>
      <GoogleLoginBtn />
      <FacebookLoginBtn />
    </div>
  );
};
