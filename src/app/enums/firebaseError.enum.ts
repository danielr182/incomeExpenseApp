export enum FirebaseError {
  'auth/email-already-exists' = 'Otro usuario ya está utilizando el correo electrónico proporcionado',
  'auth/email-already-in-use' = 'Otro usuario ya está utilizando el correo electrónico proporcionado',
  'auth/invalid-email' = 'El valor que proporcionó para el correo electrónico no es válido',
  'auth/invalid-password' =
    'El valor que proporcionó para la contraseña no es válido. Debe tener al menos seis caracteres',
  'auth/user-not-found' = 'Correo electrónico no registrado',
  'auth/weak-password' = 'La contraseña debe tener al menos 6 caracteres',
  'auth/wrong-password' = 'Datos de acceso incorrectos',
  'generic' = 'Ocurrió un error inesperado. Por favor intente más tarde'
};
