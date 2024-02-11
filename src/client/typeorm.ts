import { createConnection, Connection } from 'typeorm';
import { ContactEntity } from '../models/contactEntity'; 

let connection: Connection;

const initializeConnection = async (): Promise<any> => {
  if (!connection || !connection.isConnected) {
    connection = await createConnection({
      type: 'postgres',
      url: 'postgres://root:IGqFMHDt7JjoA9stE2xJ6z63QmCTBMfS@dpg-cn3mctvqd2ns73eierpg-a.oregon-postgres.render.com/assignment_fkps', 
      entities: [ContactEntity], 
      ssl: {
        rejectUnauthorized: false
      },
      synchronize: false, 
    });
  }
};

const getConnection = (): Connection => {
  if (!connection || !connection.isConnected) {
    throw new Error('Connection not initialized. Call initializeConnection() first.');
  }
  return connection;
};

export { initializeConnection, getConnection };
