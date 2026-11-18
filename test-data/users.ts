export const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
  invalid: { username: 'not_a_real_user', password: 'wrong_password' },
};

export const loginErrors = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
};