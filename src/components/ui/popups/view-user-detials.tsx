import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUserById } from "../../../redux/features/user/user-slice";

const UserDetail = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { selectedUser, selectedLoading, selectedError } = useAppSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (selectedLoading) {
    return <div className="text-white">Loading user details...</div>;
  }

  if (selectedError) {
    return (
      <div className="text-red-400">
        Error: {selectedError}
        <button
          onClick={() => dispatch(fetchUserById(id))}
          className="ml-2 px-2 py-1 bg-white text-black rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!selectedUser) return null;

  return (
    <>
      <h1 className="text-2xl font-semibold">User Details</h1>
      <div className="flex flex-col items-center">
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <div className="m-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500">
          <h2 className="text-xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white bg-clip-text">
            {selectedUser.name}
          </h2>
        </div>

        <p className="text-center text-sm text-gray-300 mb-4">
          {selectedUser.email}
        </p>

        <div className="w-full space-y-3">
          <p className="text-sm text-gray-500">Phone</p>
          <div className="flex items-center gap-2">
            <img src="/icons/phone.svg" />
            <span>{selectedUser.phone || "N/A"}</span>
          </div>
          <p className="text-sm text-gray-500">Location</p>
          <div className="flex items-center gap-2">
            <img src="/icons/location.svg" />
            <span>{selectedUser.location || "N/A"}</span>
          </div>
          <p className="text-sm text-gray-500">DOB</p>
          <div className="flex items-center gap-2 p-1">
            <img src="/icons/dob.svg" />
            <span>{selectedUser.dob || "N/A"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
