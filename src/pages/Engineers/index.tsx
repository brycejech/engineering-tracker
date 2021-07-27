import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';

import { engineersSelector, sitesSelector, deleteEngineer } from '../../store';
import { Pencil, Trash } from '../../components';
import './Engineers.scss';

type EngineerWithSite = Engineer & { matchedSite?: Site };
type EngineerSortKey = keyof EngineerWithSite | undefined;

const Engineers: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const engineers = useSelector(engineersSelector);
  const sites = useSelector(sitesSelector);
  const [searchString, setSearchString] = useState<string>('');
  const [filteredEngineers, setFilteredEngineers] = useState<Engineer[]>(engineers || []);
  const [sortKey, setSortKey] = useState<EngineerSortKey>();
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    let newEngineerList: EngineerWithSite[] = engineers.map((e) => ({
      ...e,
      matchedSite: sites.find((s) => s.id === e.site),
    }));

    if (searchString) {
      newEngineerList = newEngineerList.filter((e) => {
        let searchText = Object.values(e).join(' ');

        searchText += ` ${(sites.find((s) => s.id === e.site) || { name: '' }).name}`;

        const exp = new RegExp(searchString, 'ig');

        return exp.test(searchText);
      });
    }

    if (sortKey) {
      if (sortKey === 'matchedSite') {
        newEngineerList.sort((a, b) => {
          if (a.matchedSite?.name === b.matchedSite?.name) return 0;

          return (a.matchedSite?.name || '') > (b.matchedSite?.name || '') ? 1 : -1;
        });
      } else {
        newEngineerList.sort((a, b) => {
          if (a[sortKey] === b[sortKey]) return 0;

          return (a[sortKey] || '') > (b[sortKey] || '') ? 1 : -1;
        });
      }

      newEngineerList = sortAsc ? newEngineerList : newEngineerList.reverse();
    }

    setFilteredEngineers(newEngineerList);
  }, [engineers, searchString, sites, sortKey, sortAsc]);

  function onDeleteEngineer(engineer: Engineer): void {
    dispatch(deleteEngineer(engineer));
  }

  return (
    <div className="page engineers">
      <div className="flex-row table-features">
        <div className="col">
          <div className="flex-row justify-start">
            <label>
              Sort:
              <select
                value={sortKey}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setSortKey(e.target.value as EngineerSortKey);
                }}
              >
                <option value=""></option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
                <option value="matchedSite">Site</option>
              </select>
            </label>
            <label>
              <select
                value={sortAsc ? undefined : '1'}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setSortAsc(e.target.value ? false : true);
                }}
              >
                <option value="">Asc</option>
                <option value="1">Desc</option>
              </select>
            </label>
          </div>
        </div>
        <div className="col">
          <div className="flex-row justify-end ">
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
        </div>
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
                        <Link className="site-link" to={`/sites/${s.id}`}>
                          {s.name}
                        </Link>
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
  );
};

export default Engineers;
