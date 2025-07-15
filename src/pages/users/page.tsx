// pages/users/UserGrid.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/features/user/user-slice";
import UserCardSkeleton from "../../components/user/user-card-skeletal";
import UserCard from "../../components/user/user-card";
import { retryAction } from "../../utils/retry";

const UserGrid = () => {
  //dispatch is used to dispatch actions to the redux store
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);
  const [timedOut, setTimedOut] = useState(false);

  //when the component mounts, dispatch the fetchUsers action
  useEffect(() => {
    dispatch(fetchUsers());
    //loads 10 seconds utill it times out
    const timeout = setTimeout(() => {
      if (loading) setTimedOut(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [dispatch]);
  //this is a retry function from the retry helper in utils folder
  //if the loading is true and the timeout is true, then the retry function is called
  //the retry function is called with the dispatch and the fetchUsers action
  const handleRetry = () => {
    setTimedOut(false);
    retryAction(dispatch, fetchUsers);
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {loading && !timedOut && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-y-auto w-full ">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      )}

      {timedOut && error && (
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-y-auto w-full ">
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              avatar={user.avatar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGrid;
