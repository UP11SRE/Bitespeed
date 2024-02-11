"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = 'postgres://root:IGqFMHDt7JjoA9stE2xJ6z63QmCTBMfS@dpg-cn3mctvqd2ns73eierpg-a.oregon-postgres.render.com/assignment_fkps';
const pool = new pg_1.Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = pool;
