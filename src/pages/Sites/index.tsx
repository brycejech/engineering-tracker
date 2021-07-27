import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';

import { engineersSelector, sitesSelector, deleteSite } from '../../store';
import { Pencil, Trash } from '../../components';
import EngineerPill from './EngineerPill';
import './Sites.scss';

const Sites: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const engineers = useSelector(engineersSelector);
  const sites = useSelector(sitesSelector);

  const [searchString, setSearchString] = useState<string>('');
  const [filteredSites, setFilteredSites] = useState<Site[]>(sites || []);
  const [sortKey, setSortKey] = useState<keyof Site | undefined>();
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    let newSitesList = [...sites];

    if (searchString) {
      newSitesList = sites.filter((s) => {
        let searchText = Object.values(s).join(' ');

        engineers.forEach((e) => {
          if (e.site === s.id) searchText += ` ${e.firstName} ${e.lastName}`;
        });

        const exp = new RegExp(searchString, 'ig');

        return exp.test(searchText);
      });
    }

    if (sortKey) {
      newSitesList.sort((a, b) => {
        if (a[sortKey] === b[sortKey]) return 0;

        return (a[sortKey] || '') > (b[sortKey] || '') ? 1 : -1;
      });

      newSitesList = sortAsc ? newSitesList : newSitesList.reverse();
    }

    setFilteredSites(newSitesList);
  }, [engineers, searchString, sites, sortAsc, sortKey]);

  function onDeleteSite(site: Site): void {
    dispatch(deleteSite(site));
  }

  return (
    <div className="page sites">
      <div className="flex-row table-features">
        <div className="col">
          <div className="flex-row justify-start">
            <label>
              Sort By:
              <select
                value={sortKey}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setSortKey(e.target.value as keyof Site);
                }}
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="street">Street</option>
                <option value="city">City</option>
                <option value="state">State</option>
                <option value="postalCode">Postal Code</option>
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
          <div className="flex-row justify-end">
            <input
              className="search"
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)}
            />
            <Link className="create-item" to="/sites/new">
              New Site
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-col">
        <table>
          <thead>
            <tr>
              <td>Site Name</td>
              <td>Street 1</td>
              <td>Street 2</td>
              <td>City</td>
              <td>State</td>
              <td>Postal Code</td>
              <td>Engineers</td>
              <td className="text-center">Manage</td>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((s) => {
              return (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.street}</td>
                  <td>{s.street2}</td>
                  <td>{s.city}</td>
                  <td>{s.state}</td>
                  <td>{s.postalCode}</td>
                  <td>
                    {engineers
                      .filter((e) => e.site === s.id)
                      .map((e) => (
                        <EngineerPill key={e.id} engineer={e} />
                      ))}
                  </td>
                  <td className="text-center">
                    <div className="icon-wrapper">
                      <button className="icon-button link">
                        <Link exact to={`sites/${s.id}`}>
                          <Pencil />
                        </Link>
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => {
                          onDeleteSite(s);
                        }}
                      >
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

export default Sites;
