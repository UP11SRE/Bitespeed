const express = require("express");
import { initializeConnection } from './src/client/typeorm'; 
import router from './src/router/router';

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', router);

initializeConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('TypeORM connection error: ', error);
  });
