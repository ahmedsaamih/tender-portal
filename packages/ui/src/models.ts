export type AuthenticatedUser = {
  id?: number;
  entityId?: number;
  name?: string;
  type?: 'organization' | 'vendor';
  token?: string;
};

export type Bid = {
  id: number;
  tenderId: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
  vendor?: Vendor;
};

export type Credentials = {
  email: string;
  password: string;
};

export type Organization = {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  tenders?: Tender[];
  _count?: {
    tenders?: number;
  };
};

export type SignUpInput = {
  vendorName?: string;
  vendorRegistrationNo?: string;
  name: string;
  email: string;
  password: string;
};

export type Tender = {
  id: number;
  number: string;
  title: string;
  description: string;
  dueDate: string;
  views: number;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  bids?: Bid[];
  organization?: Organization;
};

export type TenderCreateInput = {
  title: string;
  description: string;
};

export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  lastLoginAt: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  vendor?: Vendor;
  organization?: Organization;
};

export type Stats = {
  title: string;
  count: string;
};

export type Vendor = {
  id: number;
  name: string;
  registration_no: string;
  status: 'active' | 'pending';
  createdAt: string;
  updatedAt: string;
};
