const passwordRequirement = (password) => {
  // Check if the length is at least 3 characters
  if (password.length < 5) {
    return false;
  }

  // Check if there's at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if there's at least one special character
  if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
    return false;
  }

  return true;
};

module.exports = passwordRequirement;
