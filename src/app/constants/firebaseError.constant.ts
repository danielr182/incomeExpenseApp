export const firebaseError: { [key: string]: string } = {
  'auth/email-already-exists': $localize`:@@msg-auth-email-already-exists:Another user is already using the email provided`,
  'auth/email-already-in-use': $localize`:@@msg-auth-email-already-in-use:Another user is already using the email provided`,
  'auth/invalid-email': $localize`:@@msg-auth-invalid-email:The value provided for email is invalid`,
  'auth/invalid-password': $localize`:@@msg-auth-invalid-password:The value provided for the password is invalid. Should be at least six characters`,
  'auth/user-not-found': $localize`:@@msg-auth-user-not-found:Email not registered`,
  'auth/weak-password': $localize`:@@msg-auth-weak-password:Password should be at least 6 characters`,
  'auth/wrong-password': $localize`:@@msg-auth-wrong-password:Incorrect access data`,
  'generic': $localize`:@@msg-generic:An unexpected error occurred. Please try later`
};
