import { PassedTestResponse } from "./test";

export type ResponseUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  passedTest: PassedTestResponse[];
  iat?: number;
  exp?: number;
};

export type RequestUser = {
  password: string;
  username?: string;
  email: string;
};
