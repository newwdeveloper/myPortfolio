export const validateLogin = (formData) => {
  const errors = {};
  if (!formData.username) errors.username = "Username is required";
  if (!formData.password) errors.password = "Password is required";
  return errors;
};

export const validateContact = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = "Name is required";
  if (!formData.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Email is invalid";
  if (!formData.message) errors.message = "Message is required";
  return errors;
};

export const validateProject = (formData) => {
  const errors = {};
  if (!formData.title) errors.title = "Title is required";
  if (!formData.description) errors.description = "Description is required";
  if (!formData.technologies) errors.technologies = "Technologies are required";
  return errors;
};
