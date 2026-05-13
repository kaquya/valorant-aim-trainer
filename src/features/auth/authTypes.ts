export type AuthTokens = {
  access: string;
  refresh: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
};