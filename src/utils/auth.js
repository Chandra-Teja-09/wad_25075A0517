const USER_KEY = 'fitness-current-user';
const USERS_KEY = 'fitness-users';

export const getUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = ({ name, email, password }) => {
  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { success: false, message: 'Email is already registered.' };
  }

  users.push({ name: name.trim(), email: normalizedEmail, password });
  saveUsers(users);
  localStorage.setItem(USER_KEY, JSON.stringify({ name: name.trim(), email: normalizedEmail }));
  return { success: true };
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((item) => item.email === normalizedEmail && item.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  localStorage.setItem(USER_KEY, JSON.stringify({ name: user.name, email: user.email }));
  return { success: true };
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const isAuthenticated = () => Boolean(getCurrentUser());

export const getStorageKey = (prefix) => {
  const user = getCurrentUser();
  return user ? `${prefix}-${user.email}` : null;
};
