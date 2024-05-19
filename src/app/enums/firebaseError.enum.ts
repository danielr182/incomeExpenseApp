export enum FirebaseError {
  'auth/email-already-exists' = 'Another user is already using the email provided',
  'auth/email-already-in-use' = 'Another user is already using the email provided',
  'auth/invalid-email' = 'The value provided for email is invalid',
  'auth/invalid-password' =
    'The value provided for the password is invalid. Should be at least six characters',
  'auth/user-not-found' = 'Email not registered',
  'auth/weak-password' = 'Password should be at least 6 characters',
  'auth/wrong-password' = 'Incorrect access data',
  'generic' = 'An unexpected error occurred. Please try later'
};
