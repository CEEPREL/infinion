import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUserById } from "../../../redux/features/user/user-slice";
import { retryAction } from "../../../utils/retry";

const UserDetail = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { selectedUser, selectedLoading, selectedError } = useAppSelector(
    (state) => state.user
  );

  if (selectedLoading) {
    return (
      <div className="text-white animate-pulse p-6 rounded-xl bg-zinc-900">
        <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4" />
        <div className="h-6 bg-gray-700 w-1/2 mx-auto mb-2 rounded" />
        <div className="h-4 bg-gray-700 w-3/4 mx-auto mb-2 rounded" />
        <div className="h-4 bg-gray-700 w-2/3 mx-auto mb-2 rounded" />
      </div>
    );
  }

  if (selectedError) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error: {selectedError}</p>
        <button
          onClick={() => retryAction(dispatch, fetchUserById, id)}
          className="mt-3 px-4 py-2 bg-white text-black rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!selectedUser) return null;

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">User Details</h1>
      <div className="flex flex-col items-center">
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <div className="m-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500">
          <h2 className="text-xl font-bold text-center text-white bg-clip-text">
            {selectedUser.name}
          </h2>
        </div>

        <p className="text-center text-sm text-gray-300 mb-4">
          {selectedUser.email}
        </p>

        <div className="w-full space-y-5">
          <p className="text-sm text-gray-500">Phone</p>
          <div className="flex items-center gap-2">
            <img src="/icons/phone.svg" alt="phone" />
            <span>{selectedUser.phone || "N/A"}</span>
          </div>

          <p className="text-sm text-gray-500">Location</p>
          <div className="flex items-center gap-2">
            <img src="/icons/location.svg" alt="location" />
            <span>{selectedUser.location || "N/A"}</span>
          </div>

          <p className="text-sm text-gray-500">DOB</p>
          <div className="flex items-center gap-2 p-1">
            <img src="/icons/dob.svg" alt="dob" />
            <span>{selectedUser.dob || "N/A"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
