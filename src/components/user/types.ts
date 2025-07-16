export interface UserCardProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  onClick: (id: string) => void;
}
