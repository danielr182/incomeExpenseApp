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
      authDomain: '${process.env['PROJECT_ID']}.firebaseapp.com',
      projectId: '${process.env['PROJECT_ID']}',
      storageBucket: '${process.env['PROJECT_ID']}.appspot.com',
      messagingSenderId: '565387043619',
      appId: '1:565387043619:web:51605a471f9afc28df6296',
      measurementId: 'G-TKQEYXBY44',
    },
    production: true,
  };
`;
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
