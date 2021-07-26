import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';

import { engineersSelector, sitesSelector, deleteEngineer } from '../../store';
import { Pencil, Trash } from '../../components';
import './Engineers.scss';

const Engineers: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const engineers = useSelector(engineersSelector);
  const sites = useSelector(sitesSelector);
  const [searchString, setSearchString] = useState<string>('');
  const [filteredEngineers, setFilteredEngineers] = useState<Engineer[]>(engineers || []);

  useEffect(() => {
    if (searchString) {
      setFilteredEngineers(
        engineers.filter((e) => {
          let searchText = Object.values(e).join(' ');

          searchText += ` ${(sites.find((s) => s.id === e.site) || { name: '' }).name}`;

          const exp = new RegExp(searchString, 'ig');

          return exp.test(searchText);
        }),
      );
    } else {
      setFilteredEngineers(engineers);
    }
  }, [engineers, searchString, sites]);

  function onDeleteEngineer(engineer: Engineer): void {
    dispatch(deleteEngineer(engineer));
  }

  return (
    <div className="page engineers">
      <div className="flex-col">
        <div className="flex-row justify-end table-features">
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)}
          />
          <Link className="create-item" to="/engineers/new">
            New Engineer
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Status</td>
              <td>Site</td>
              <td className="text-center">Manage</td>
            </tr>
          </thead>
          <tbody>
            {filteredEngineers.map((e) => {
              return (
                <tr key={e.id}>
                  <td>
                    {e.firstName} {e.lastName}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.status}</td>
                  <td>
                    {sites
                      .filter((s) => s.id === e.site)
                      .map((s) => (
                        <span key={s.id} style={{ display: 'block' }}>
                          {s.name}
                        </span>
                      ))}
                  </td>
                  <td>
                    <div className="icon-wrapper">
                      <button className="icon-button link">
                        <Link exact to={`/engineers/${e.id}`}>
                          <Pencil />
                        </Link>
                      </button>
                      <button className="icon-button" onClick={() => onDeleteEngineer(e)}>
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Engineers;
