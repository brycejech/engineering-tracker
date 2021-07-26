import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import './EngineerPill.scss';

interface EngineerPillProps {
  engineer: Engineer;
}

const EngineerPill: React.FC<EngineerPillProps> = ({ engineer }): JSX.Element => {
  return (
    <div className="engineer-pill">
      <Link exact to={`/engineers/${engineer.id}`}>
        <div className={`status ${engineer.status.toLowerCase()}`} />{' '}
        <div className="name">
          {engineer.firstName} {engineer.lastName}
        </div>
      </Link>
    </div>
  );
};

export default EngineerPill;
