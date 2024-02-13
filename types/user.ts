type ResponseUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

type RequestUser = {
  password: string;
  username?: string;
  email: string;
};
