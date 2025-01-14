import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm, itemToDelete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete {itemToDelete}?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;