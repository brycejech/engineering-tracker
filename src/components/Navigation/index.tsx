import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import './Navigation.scss';

const Navigation: React.FC = (): JSX.Element => {
  return (
    <nav>
      <Link exact className="nav-link" to="/" activeClassName="active">
        Sites
      </Link>
      <Link exact className="nav-link" to="/engineers" activeClassName="active">
        Engineers
      </Link>
    </nav>
  );
};

export default Navigation;
