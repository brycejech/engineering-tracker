interface NewEngineer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: EngineerStatus;
  site: number | null;
}

interface Engineer extends NewEngineer {
  id: number;
}

interface NewSite {
  name: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Site extends NewSite {
  id: number;
}

interface URLParams {
  id: string;
}

type EngineerStatus = 'Available' | 'Assigned' | 'Vacation';
