"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.initializeConnection = void 0;
const typeorm_1 = require("typeorm");
const contactEntity_1 = require("../models/contactEntity");
let connection;
const initializeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection || !connection.isConnected) {
        connection = yield (0, typeorm_1.createConnection)({
            type: 'postgres',
            url: 'postgres://root:IGqFMHDt7JjoA9stE2xJ6z63QmCTBMfS@dpg-cn3mctvqd2ns73eierpg-a.oregon-postgres.render.com/assignment_fkps',
            entities: [contactEntity_1.ContactEntity],
            ssl: {
                rejectUnauthorized: false
            },
            synchronize: true,
        });
    }
});
exports.initializeConnection = initializeConnection;
const getConnection = () => {
    if (!connection || !connection.isConnected) {
        throw new Error('Connection not initialized. Call initializeConnection() first.');
    }
    return connection;
};
exports.getConnection = getConnection;
