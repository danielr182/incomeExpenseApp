const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    firebase: {
      apiKey: '${process.env['FIREBASE_API_KEY']}',
      authDomain: 'income-expense-app-94e37.firebaseapp.com',
      projectId: 'income-expense-app-94e37',
      storageBucket: 'income-expense-app-94e37.appspot.com',
      messagingSenderId: '565387043619',
      appId: '1:565387043619:web:51605a471f9afc28df6296',
      measurementId: 'G-TKQEYXBY44',
    },
    production: true,
  };
`;
  console.log('The file `environment.ts` will be written with the following content: \n');
  console.log(envConfigFile);
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
