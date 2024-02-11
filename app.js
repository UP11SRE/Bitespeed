"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("./src/client/typeorm");
const router_1 = __importDefault(require("./src/router/router"));
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());
app.use('/', router_1.default);
(0, typeorm_1.initializeConnection)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch(error => {
    console.error('TypeORM connection error: ', error);
});
