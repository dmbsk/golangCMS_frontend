import React from 'react';
import './adminPanel.scss';
import { Link } from 'react-router-dom';
import AdminArticleTable from './AdminArticleTable/AdminArticleTable';
import UsersTable from './UsersTable/UsersTable';

const AdminPanel = () => {
  const userRole = localStorage.getItem('userRole');
  const isAuthorized = ['writer', 'moderator', 'admin'].indexOf(userRole) !== -1;
  const isAdmin = userRole === 'admin';
  return (
    <div className="admin-panel not-center">
      <AdminArticleTable />
      {isAuthorized ? <Link className="new-article" to="/articleCreator">+</Link> : null}
      {isAdmin ? <UsersTable /> : null}
    </div>
  );
};

export default AdminPanel;
