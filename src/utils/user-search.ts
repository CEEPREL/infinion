import { User } from "../redux/types/user-type";

export const searchUsers = (users: User[], query: string): User[] => {
  const lowerQuery = query.toLowerCase().trim();

  return users.filter((user) =>
    [user.name, user.email].some((field) =>
      field.toLowerCase().includes(lowerQuery)
    )
  );
};
