export const updatedUser = async (editUserName, id) => {
  await fetch(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: editUserName }),
  });
};
