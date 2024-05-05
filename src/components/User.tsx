import React, { useState } from "react";
import Avatar from "../assets/avatar.jpg";
import "../App.css";

interface IUser {
  name: string;
  percentage: number;
}

interface UserProps {
  user: IUser;
  onUpdateUser: (updatedUser: IUser) => void;
  onDelete: (name: string) => void;
}

export const User: React.FC<UserProps> = ({ user, onUpdateUser, onDelete }) => {
  const [editableUser, setEditableUser] = useState<IUser>(user);
  const [SecShowInput, setSecShowInput] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableUser({ ...editableUser, name: e.target.value });
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableUser({ ...editableUser, percentage: Number(e.target.value) });
  };

  const saveChanges = () => {
    onUpdateUser(editableUser);
  };

  return (
    <div className="p-2 my-2 bg-white rounded shadow text-black">
      <table className="table-auto text-black bg-gray-50 rounded-lg  drop-shadow-xl mt-10 w-full">
        <thead>
          <tr>
            <th className="pt-5 ">Expert Name</th>
            <th className="pt-5 ">Percentage</th>
            <th className="pt-5 ">Action</th>
            <th className="pt-5 ">Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center w-52">
                <img src={Avatar} className="rounded-full w-20 p-4" alt="" />
                <p>{editableUser.name}</p>
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center">
                {SecShowInput ? (
                  <input
                    type="number"
                    className=" border border-gray-300 p-2 bg-white w-10 "
                    value={editableUser.percentage.toString()}
                    onChange={handlePercentageChange}
                    onBlur={() => setSecShowInput(false)}
                    min="0"
                  />
                ) : (
                  <div onClick={() => setSecShowInput(true)}>
                    {editableUser.percentage.toString()}%
                  </div>
                )}
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                  onClick={saveChanges}
                >
                  Save
                </button>
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => onDelete(user.name)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
