export const createUser = async (value) => {
 const createdUserResponse =  await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: value }),
  });

  const createdUser = await createdUserResponse.json();
  return createdUser;

};
