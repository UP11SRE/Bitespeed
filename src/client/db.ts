import { Pool } from 'pg';

const connectionString = 'postgres://root:IGqFMHDt7JjoA9stE2xJ6z63QmCTBMfS@dpg-cn3mctvqd2ns73eierpg-a.oregon-postgres.render.com/assignment_fkps';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  }
});

export default pool;
