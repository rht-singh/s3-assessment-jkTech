const { generateToken } = require('./jwtUtils');

const createToken = () => {
  const userId = 1;
  // genrrate a token on the behalf of userId then print in console
  console.log('token =', generateToken({ id: userId }));
};

createToken();
