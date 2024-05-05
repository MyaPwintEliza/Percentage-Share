// import "./App.css";
// import { Collaborator } from "./components/Collaborator";

// function App() {
//   return <Collaborator />;
// }

// export default App;

import { useState, FormEvent } from "react";
import { User } from "./components/User";
import Avatar from "./assets/avatar.jpg";

interface IUser {
  name: string;
  percentage: number;
}

export const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPercentage, setNewUserPercentage] = useState<number | "">("");
  const [adminPercentage, setAdminPercentage] = useState(100);

  // const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (newUserName && newUserPercentage !== "") {
  //     const newPercentage = Number(newUserPercentage);
  //     const newUsers = [
  //       ...users,
  //       { name: newUserName, percentage: newPercentage },
  //     ];
  //     setUsers(newUsers);
  //     setAdminPercentage((prev) => prev - newPercentage);
  //     setNewUserName("");
  //     setNewUserPercentage("");
  //   }
  // };
  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUserName && newUserPercentage !== "") {
      const inputPercentage = Number(newUserPercentage);
      const totalPercentageUsed = users.reduce(
        (sum, user) => sum + user.percentage,
        0
      );
      const availablePercentage = 100 - totalPercentageUsed;

      const newPercentage = Math.min(inputPercentage, availablePercentage);
      if (newPercentage >= 1) {
        setUsers((prevUsers) => [
          ...prevUsers,
          { name: newUserName, percentage: newPercentage },
        ]);
        setAdminPercentage((prev) => prev - newPercentage);
      } else {
        alert(
          "No available percentage left to assign or the assigned percentage is too low."
        );
      }

      // Reset input fields, but provide feedback on the maximum percentage assignable if necessary
      setNewUserName("");
      setNewUserPercentage("");
      if (inputPercentage > availablePercentage) {
        alert(
          `Only ${availablePercentage}% was available. ${newUserName} has been assigned this remaining percentage.`
        );
      }
    }
  };

  // const handleUpdateUser = (updatedUser: IUser) => {
  //   const newUsers = users.map((user) =>
  //     user.name === updatedUser.name ? updatedUser : user
  //   );
  //   setUsers(newUsers);
  //   const totalPercentageUsed = newUsers.reduce(
  //     (acc, user) => acc + user.percentage,
  //     0
  //   );
  //   setAdminPercentage(100 - totalPercentageUsed);
  // };
  const handleUpdateUser = (updatedUser: IUser) => {
    let newUsers = users.map((user) =>
      user.name === updatedUser.name
        ? {
            ...user,
            percentage: Math.max(1, Math.min(100, updatedUser.percentage)),
          }
        : user
    );

    const totalPercentageUsed = newUsers.reduce(
      (acc, user) => acc + user.percentage,
      0
    );
    if (totalPercentageUsed > 100) {
      const excess = totalPercentageUsed - 100;
      const index = newUsers.findIndex(
        (user) => user.name === updatedUser.name
      );
      if (index !== -1 && newUsers[index].percentage > excess) {
        newUsers[index].percentage -= excess;
        alert(
          `Total percentage exceeded 100%. Adjusted ${updatedUser.name}'s percentage by ${excess}%.`
        );
      }
    }
    setUsers(newUsers);
    setAdminPercentage(
      100 - newUsers.reduce((acc, user) => acc + user.percentage, 0)
    );
  };

  const handleDeleteUser = (name: string) => {
    const newUsers = users.filter((user) => user.name !== name);
    setUsers(newUsers);
    const totalPercentageUsed = newUsers.reduce(
      (acc, user) => acc + user.percentage,
      0
    );
    setAdminPercentage(100 - totalPercentageUsed);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow text-black mt-10">
      <h1 className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text h-40">
        Percentage Sharing
      </h1>
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Admin: {adminPercentage}%
      </h1> */}

      <form onSubmit={handleAddUser} className="mb-4 flex gap-2">
        <input
          type="text"
          className="border text-black border-gray-300 p-2 bg-white w-20"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="number"
          className="border text-black border-gray-300 p-2 bg-white w-20"
          placeholder="Percentage"
          value={newUserPercentage.toString()}
          onChange={(e) => setNewUserPercentage(Number(e.target.value))}
          min="0"
          max={Math.max(0, adminPercentage)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </form>
      <table className="table-auto text-black bg-gray-50 rounded-lg w-full drop-shadow-xl">
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
              <div className="flex items-center justify-center w-52 ">
                <img src={Avatar} className="rounded-full w-20 p-4 " alt="" />
                Mya Pwint
                <p className="text-sm bg-blue-300 p-1 rounded-full mx-1 flex">
                  Owner
                </p>
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center">
                {adminPercentage}%
              </div>
            </td>
            <td></td>
            <td>
              <div className="flex items-center justify-center">
                <button className="bg-red-200 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {users.map((user) => (
        <User
          key={user.name}
          user={user}
          onUpdateUser={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
};
