
export interface IGroup {
  name: string;
  channels: string[];
}

export interface IUser {
  username: string;
  birthday: string;
  age: number;
  email: string;
  password: string;
  valid: boolean;
  role: 0 | 5 | 10 | 15; // basic|groupAssis|groupAdmin|superAdmin
  groups: IGroup[];
}