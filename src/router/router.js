"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controller/contactController");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).json({ message: "Dude You are on wrong side...." });
});
router.post("/identify", contactController_1.identify);
exports.default = router;
