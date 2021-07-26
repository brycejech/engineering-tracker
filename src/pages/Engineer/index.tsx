import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { engineerSelector, sitesSelector, addEngineer, updateEngineer } from '../../store';
import './Engineer.scss';

const Engineer: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<URLParams>();
  const engineer = useSelector(engineerSelector(Number(id)));
  const sites = useSelector(sitesSelector);

  const [firstName, setFirstName] = useState<string>(engineer?.firstName || '');
  const [lastName, setLastName] = useState<string>(engineer?.lastName || '');
  const [email, setEmail] = useState<string>(engineer?.email || '');
  const [phone, setPhone] = useState<string>(engineer?.phone || '');
  const [status, setStatus] = useState<EngineerStatus>(engineer?.status || 'Available');
  const [site, setSite] = useState<number | null>(engineer?.site || null);

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const data: NewEngineer | Engineer = {
      firstName,
      lastName,
      email,
      phone,
      status,
      site: site || null,
    };

    if (engineer) {
      const updatedEngineer: Engineer = {
        ...data,
        id: engineer.id,
      };
      dispatch(updateEngineer(updatedEngineer));
    } else {
      dispatch(addEngineer(data));
    }
  }

  return (
    <div className="page engineer">
      <form onSubmit={onSubmit}>
        <div className="form-input">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as EngineerStatus)
            }
          >
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Vacation">Vacation</option>
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="site">Site</label>
          <select
            id="site"
            value={site || undefined}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSite(Number(e.target.value))}
          >
            <option value="">None</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{engineer ? 'Update' : 'Create'} Engineer</button>
      </form>
    </div>
  );
};

export default Engineer;
