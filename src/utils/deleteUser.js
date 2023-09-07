export const deleteUser = async (id) => {
  const response = await fetch(`/users/${id}`, {
    method: "DELETE",
  });

  return response
};
