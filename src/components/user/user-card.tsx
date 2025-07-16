import React from "react";
import { UserCardProps } from "./types";

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  avatar,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="dark:bg-zinc-900 bg-white rounded-2xl p-6 w-full h-72 flex flex-col items-center justify-center text-center shadow-md cursor-pointer dark:hover:bg-zinc-800 transition hover:bg-zinc-300"
    >
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-2 border-zinc-800 mb-4"
      />
      <h3 className="dark:text-white text-gray-500 text-lg font-bold">
        {name}
      </h3>
      <p className="text-zinc-400 text-sm mt-1">{email}</p>
    </div>
  );
};

export default UserCard;
