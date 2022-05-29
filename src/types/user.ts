export enum Role {
  USER,
  ADMIN,
  CREATOR,
}

export enum UserStatus {
  ACTIVE,
  INACTIVE,
  PAUSE,
  BLOCK,
}

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export enum SocialType {
  FACEBOOK,
  GOOGLE,
}

export type JWT = {
  value: string;

  exp: Date;

  createdAt: Date;
};

export type User = {
  _id?: string;

  email?: string;

  username?: string;

  name?: string;

  firstName?: string;

  lastName?: string;

  avatar?: string;

  phone?: string;

  socialType?: SocialType;

  socialId?: string;

  gender?: Gender;

  birthday?: Date;

  tokens?: JWT[];

  roles?: Role[];

  status?: UserStatus;

  createdAt?: Date;

  updatedAt?: Date;
};

export type UserSlice = {
  loadingLogin: boolean;
  loadingGetList?: boolean;
  token?: string;
  user?: User;
  list?: User[];
};

export type UpdateUserInput = {
  username: string;
};

export type SearchUserInput = {
  count?: boolean;

  key?: string;

  limit?: number;

  offset?: number;

  orderBy?: string;

  sortBy?: number;
};
