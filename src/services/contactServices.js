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
exports.identifyContact = void 0;
const contactRepository_1 = require("../repository/contactRepository");
const identifyContact = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    email = String(email).toLowerCase();
    phoneNumber = String(phoneNumber).toLowerCase();
    console.log("checking the details ", email, phoneNumber);
    const res = yield (0, contactRepository_1.createContact)(email, phoneNumber);
    return res;
});
exports.identifyContact = identifyContact;
