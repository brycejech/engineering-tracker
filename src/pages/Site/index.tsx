import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { siteSelector, addSite, updateSite } from '../../store';
import './Site.scss';

const Site: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<URLParams>();
  const site = useSelector(siteSelector(Number(id)));

  const [name, setName] = useState<string>(site?.name || '');
  const [street, setStreet] = useState<string>(site?.street || '');
  const [street2, setStreet2] = useState<string>(site?.street2 || '');
  const [city, setCity] = useState<string>(site?.city || '');
  const [state, setState] = useState<string>(site?.state || '');
  const [postalCode, setPostalCode] = useState<string>(site?.postalCode || '');

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const data: NewSite | Site = {
      name,
      street,
      street2,
      city,
      state,
      postalCode,
    };

    if (site) {
      const updatedSite: Site = {
        ...data,
        id: site.id,
      };

      dispatch(updateSite(updatedSite));
    } else {
      dispatch(addSite(data));
    }
  }

  return (
    <div className="page site">
      <form onSubmit={onSubmit}>
        <div className="form-input">
          <label htmlFor="name">Site Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="street">Street 1</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="street2">Street 2</label>
          <input
            type="text"
            id="street2"
            value={street2}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStreet2(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
          />
        </div>
        <button type="submit">{site ? 'Update' : 'Create'} Site</button>
      </form>
    </div>
  );
};

export default Site;
