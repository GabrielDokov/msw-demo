export const validateInputs = (value) => {
  if (value.length <= 2 || value.length > 20) {
    return alert("Input value needs to be between 2 and 20 sumbols");
  }
};
