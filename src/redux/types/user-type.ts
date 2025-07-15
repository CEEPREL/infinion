export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  dob: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;

  creating: boolean;
  createError: string | null;

  selectedUser: User | null;
  selectedLoading: boolean;
  selectedError: string | null;
}
