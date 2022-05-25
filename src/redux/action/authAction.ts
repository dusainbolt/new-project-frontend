import { PayloadName } from '@redux/reducer';
// import { Role } from '@type/user';

export type LoginParams = {
  address: string;
  signature: string;
  messageHash: string;
  // role: Role;
};

export type LoginResponse = {
  address: string;
  token: string;
};

export type LoginAction = Record<PayloadName, LoginParams>;
export type LoginSuccess = Record<PayloadName, LoginResponse>;
