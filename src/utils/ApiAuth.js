export const BASE_URL = 'https://auth.nomoreparties.co/';

const request = ({ url, method = 'POST', token, body }) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!body && { body: JSON.stringify(body) }),
  };
  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

export const register = (email, password) => {
  return request({
    url: 'signup',
    body: { email, password },
  });
};

export const authorize = (email, password) => {
  return request({
    url: 'signin',
    body: { email, password },
  }).then((res) => {
    if (res.token) {
      localStorage.setItem('jwt', res.token);
      return res;
    }
  });
};

export const checkToken = (token) => {
  return request({
    url: 'users/me',
    method: 'GET',
    token,
  });
};
