import loadable from '@loadable/component';
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

import { MainLayout } from '../Layout/MainLayout';

const isUserLogin = () => {
  console.log('isUserLogin');
  return false;
};

export const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    component: loadable(() => import('../pages/Login')),
  },
  {
    path: '/signUp',
    name: 'Sign Up',
    component: loadable(() => import('../pages/SignUp')),
  },
  {
    path: '/forgotPassword',
    name: 'Forgot Password',
    component: loadable(() => import('../pages/ForgotPassword')),
  },
  {
    component: MainLayout,
    path: '/',
    routes: [
      {
        name: 'Main',
        path: '/',
        exact: true,
        component: loadable(() => import('../pages/Index')),
      },
      {
        name: 'Page 1',
        path: '/page1',
        component: loadable(() => import('../pages/page1')),
      },
      {
        name: 'Page 2',
        path: '/page2',
        component: loadable(() => import('../pages/page2')),
      },
      {
        name: 'Page 3',
        path: '/page3',
        component: loadable(() => import('../pages/page3')),
      },
      {
        name: 'Private',
        path: '/private',
        render: function render() {
          return isUserLogin() ? (
            loadable(() => import('../pages/Private'))
          ) : (
            <Redirect to="/login" />
          );
        },
      },
    ],
  },
];
