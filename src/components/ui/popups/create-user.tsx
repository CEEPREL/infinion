import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createUser,
  resetError,
} from "../../../redux/features/user/user-slice";
import { closeModal } from "../../../redux/features/modal/modal-slice";

const UserForm = () => {
  const dispatch = useAppDispatch();
  //destructured user state from redux store
  const { creating, createError } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dob: "",
  });

  //local validation error state
  const [validationError, setValidationError] = useState("");

  //reset error state when component mounts
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  //handle change for dynamic form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError(""); // clear validation error on input
  };

  //validate required fields
  const isValid = () => {
    if (!formData.name || !formData.location || !formData.dob) {
      setValidationError("All fields are required.");
      return false;
    }
    return true;
  };

  //handle submit for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) return;

    try {
      await dispatch(createUser(formData)).unwrap();

      dispatch(closeModal());

      window.location.reload(); // reload after successful save
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black p-6 rounded-xl w-full max-w-md"
    >
      <h2 className="text-white text-xl font-bold mb-4">Enter User Details</h2>

      <div className="mb-4">
        <label className="text-white block">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="text-white block">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="text-white block">Date of Birth</label>
        <input
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      {/* Show validation or create error */}
      {validationError && (
        <p className="text-red-500 mb-2">{validationError}</p>
      )}
      {createError && !validationError && (
        <p className="text-red-500 mb-2">{createError} — Please retry.</p>
      )}

      <button
        type="submit"
        className="w-full bg-white text-black font-bold py-2 px-4 rounded"
        disabled={creating}
      >
        {creating ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default UserForm;
