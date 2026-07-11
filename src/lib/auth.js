export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');

export const setSession = ({ token, username }) => {
  if (token) localStorage.setItem('token', token);
  if (username) localStorage.setItem('username', username);
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const isAuthenticated = () => Boolean(getToken());

export const getApiErrorMessage = (err, fallback = 'Something went wrong') =>
  err?.response?.data?.msg || err?.response?.data?.message || err?.message || fallback;
