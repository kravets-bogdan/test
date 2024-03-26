export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: {
    password: string;
    confirmPassword: string;
  };
  userType: string;
}

export enum UserType {
  ADMINISTRATOR = 'Administrator',
  DRIVER = 'Driver',
}
