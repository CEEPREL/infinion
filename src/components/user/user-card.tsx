// components/ui/cards/UserCard.tsx
import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 md:w-60 lg:w-96 w-full h-72 flex flex-col items-center justify-center text-center shadow-md">
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-2 border-zinc-800 mb-4"
      />
      <h3 className="text-white text-lg font-bold">{name}</h3>
      <p className="text-zinc-400 text-sm mt-1">{email}</p>
    </div>
  );
};

export default UserCard;
