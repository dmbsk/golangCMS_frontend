import React from 'react';
import './admin.scss';

import AuthorizedComponent from '../../components/AuthorizedComponent/AuhtorizedComponent';
import AdminPanel from '../../components/cmsComponents/AdminPanel/AdminPanel.jsx';

const Admin = () => {
  const userRole = localStorage.getItem('userRole');
  const isAuthoryzed = ['moderator', 'admin', 'writer'].indexOf(userRole) !== -1;

  return (
    isAuthoryzed ? <AdminPanel /> : <AuthorizedComponent />
  );
};


export default Admin;
