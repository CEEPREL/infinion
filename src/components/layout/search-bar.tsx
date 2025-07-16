import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchUsers } from "../../utils/user-search";
import { fetchUserById } from "../../redux/features/user/user-slice";
import { openModal } from "../../redux/features/modal/modal-slice";
import UserDetail from "../ui/popups/view-user-detials";
import SearchBox from "../ui/inputs/search-input";

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, error } = useAppSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const matchedUsers = query
    ? searchUsers(users, query.toLowerCase()).slice(0, 6)
    : [];

  const handleSelect = async (id: string) => {
    if (!error) {
      const result = await dispatch(fetchUserById(id));
      if (fetchUserById.fulfilled.match(result)) {
        dispatch(openModal(<UserDetail id={id} />));
      }
    }
    setQuery("");
    setFocused(false);
  };

  return (
    <div className="w-full">
      <SearchBox
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
        placeholder="Search user by name"
      />

      {/* Dropdown Result */}
      {focused && query && (
        <div className="absolute z-50 bg-white dark:bg-zinc-900 text-white w-full rounded-md mt-2 border border-zinc-700 shadow-lg max-h-64 overflow-y-auto">
          {matchedUsers.length > 0 ? (
            matchedUsers.map((user) => (
              <div
                key={user.id}
                onMouseDown={() => handleSelect(user.id)}
                className="px-4 py-2 hover:bg-zinc-700 cursor-pointer flex gap-3 items-center"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-zinc-400">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
