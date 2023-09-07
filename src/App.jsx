import { response } from "msw";
import { useState } from "react";
import { useEffect } from "react";
import { updatedUser } from "./utils/updateUser";
import { validateInputs } from "./utils/validateInputs";
import { createUser } from "./utils/createUser";
import { deleteUser } from "./utils/deleteUser";

function App() {
  const [usersArr, setUsersArray] = useState([]);
  const [value, setValue] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");

  useEffect(() => {
    // TODO make it work
    fetch("/users")
      .then((response) => response.json())
      .then((data) => setUsersArray(data));
  }, []);

  const handleSubmit = async () => {
    validateInputs(value);
    const createdUser = await createUser(value);
    setUsersArray((prevstate) => [...prevstate, createdUser]);
    setValue("");
  };

  const handleDelete = (id) => {
    deleteUser(id);
    setUsersArray((prevstate) => prevstate.filter((user) => user.id !== id));
  };

  const startEditing = (id, username) => {
    setEditUserId(id);
    setEditUserName(username);
  };

  const updateUserHandler = async (id, userName) => {
    setEditUserId(id);
    setEditUserName(userName);

    updatedUser(id, editUserName);
    setUsersArray((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, username: editUserName } : user
      )
    );

    setEditUserId(null);
    setEditUserName("");
  };

  const handleCancel = () => {
    setEditUserId("");
    setEditUserName("");
  };

  return (
    <>
      {usersArr.map((user) => (
        <div key={user.id}>
          {editUserId === user.id ? (
            <>
              <input
                type="text"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
              <button onClick={() => updateUserHandler(user.id, user.username)}>
                Update
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <p onClick={() => startEditing(user.id, user.username)}>
              {user.username}
            </p>
          )}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}

      <input
        type="text"
        name="user"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Create user</button>
    </>
  );
}

export default App;
