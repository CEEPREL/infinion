import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/features/modal/modal-slice";
import { RootState } from "../../../redux/store";

const GlobalModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state: RootState) => state.modal);

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="dark:bg-black bg-white rounded-lg shadow-lg p-6 relative max-w-md w-full z-50">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
          onClick={() => dispatch(closeModal())}
        >
          ✕
        </button>
        {content}
      </div>
    </div>
  );
};

export default GlobalModal;
