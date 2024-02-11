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
exports.createContact = void 0;
const typeorm_1 = require("typeorm");
const contactEntity_1 = require("../models/contactEntity");
const createContact = (email, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const clean_data = (result, email, phone_number, pid) => __awaiter(void 0, void 0, void 0, function* () {
        const uniqueEmails = new Set();
        result.forEach((item) => {
            uniqueEmails.add(item.email);
            uniqueEmails.add(email);
        });
        const uniqueNumber = new Set();
        result.forEach((item) => {
            uniqueNumber.add(item.phone_number);
            uniqueNumber.add(phone_number);
        });
        const emails = Array.from(uniqueEmails).filter(email => email !== "null");
        const phoneNumbers = Array.from(uniqueNumber).filter(phone_number => phone_number !== "null");
        ;
        const ids = new Set();
        result.forEach((item) => {
            ids.add(item.id);
        });
        const secondaryContactIds = Array.from(ids).filter(id => id !== pid);
        return { emails, phoneNumbers, secondaryContactIds };
    });
    const contactRepository = (0, typeorm_1.getRepository)(contactEntity_1.ContactEntity);
    const existingContact = yield contactRepository.findOne({ where: { email, phone_number } });
    if (existingContact) {
        if (existingContact.linked_id) {
            const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${existingContact.linked_id} or id = ${existingContact.linked_id}`;
            const result = yield contactRepository.query(re1);
            const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, existingContact.email, existingContact.phone_number, existingContact.linked_id);
            const ans = {
                primaryContatctId: existingContact.linked_id,
                emails,
                phoneNumbers,
                secondaryContactIds
            };
            return ans;
        }
        const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${existingContact.id} or id = ${existingContact.id}`;
        const result = yield contactRepository.query(re1);
        const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, existingContact.email, existingContact.phone_number, existingContact.id);
        const ans = {
            primaryContatctId: existingContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        };
        return ans;
    }
    const [contactWithEmail, contactWithPhoneNumber] = yield Promise.all([
        contactRepository.findOne({ where: { email } }),
        contactRepository.findOne({ where: { phone_number } }),
    ]);
    if (contactWithEmail && !contactWithPhoneNumber) {
        if (phone_number === "null") {
            if (contactWithEmail.linked_id) {
                const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithEmail.linked_id} or id = ${contactWithEmail.linked_id}`;
                const result = yield contactRepository.query(re1);
                const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, contactWithEmail.email, "null", contactWithEmail.linked_id);
                const ans = {
                    primaryContatctId: contactWithEmail.linked_id,
                    emails,
                    phoneNumbers,
                    secondaryContactIds
                };
                return ans;
            }
            const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithEmail.id} or id = ${contactWithEmail.id}`;
            const result = yield contactRepository.query(re1);
            const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, contactWithEmail.email, "null", contactWithEmail.id);
            const ans = {
                primaryContatctId: contactWithEmail.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            };
            return ans;
        }
        else {
            const newContact = new contactEntity_1.ContactEntity();
            newContact.email = email;
            newContact.phone_number = phone_number;
            newContact.linked_id = (_a = contactWithEmail.linked_id) !== null && _a !== void 0 ? _a : contactWithEmail.id;
            newContact.link_precedence = 'secondary';
            newContact.created_at = new Date();
            newContact.updated_at = new Date();
            newContact.deleted_at = null;
            const savedContact = yield contactRepository.save(newContact);
            const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${(_b = contactWithEmail.linked_id) !== null && _b !== void 0 ? _b : contactWithEmail.id} or id = ${(_c = contactWithEmail.linked_id) !== null && _c !== void 0 ? _c : contactWithEmail.id}`;
            const result = yield contactRepository.query(re1);
            const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, contactWithEmail.email, contactWithEmail.phone_number, (_d = contactWithEmail.linked_id) !== null && _d !== void 0 ? _d : contactWithEmail.id);
            const ans = {
                primaryContatctId: (_e = contactWithEmail.linked_id) !== null && _e !== void 0 ? _e : contactWithEmail.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            };
            return ans;
        }
    }
    if (!contactWithEmail && contactWithPhoneNumber) {
        if (email === "null") {
            if (contactWithPhoneNumber.linked_id) {
                const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithPhoneNumber.linked_id} or id = ${contactWithPhoneNumber.linked_id}`;
                const result = yield contactRepository.query(re1);
                const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, "null", contactWithPhoneNumber.phone_number, contactWithPhoneNumber.linked_id);
                const ans = {
                    primaryContatctId: contactWithPhoneNumber.linked_id,
                    emails,
                    phoneNumbers,
                    secondaryContactIds
                };
                return ans;
            }
            const re1 = `SELECT email, phone_number, id
      FROM contact_entity
      WHERE linked_id = ${contactWithPhoneNumber.id} OR id = ${contactWithPhoneNumber.id}
       `;
            const result = yield contactRepository.query(re1);
            console.log("checking the result-1", result);
            const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, "null", contactWithPhoneNumber.phone_number, contactWithPhoneNumber.id);
            const ans = {
                primaryContatctId: contactWithPhoneNumber.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            };
            return ans;
        }
        else {
            console.log("32");
            const newContact = new contactEntity_1.ContactEntity();
            newContact.email = email;
            newContact.phone_number = phone_number;
            newContact.linked_id = (_f = contactWithPhoneNumber.linked_id) !== null && _f !== void 0 ? _f : contactWithPhoneNumber.id;
            newContact.link_precedence = 'secondary';
            newContact.created_at = new Date();
            newContact.updated_at = new Date();
            newContact.deleted_at = null;
            const savedContact = yield contactRepository.save(newContact);
            const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${(_g = contactWithPhoneNumber.linked_id) !== null && _g !== void 0 ? _g : contactWithPhoneNumber.id} or id = ${(_h = contactWithPhoneNumber.linked_id) !== null && _h !== void 0 ? _h : contactWithPhoneNumber.id}`;
            const result = yield contactRepository.query(re1);
            const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, contactWithPhoneNumber.email, contactWithPhoneNumber.phone_number, (_j = contactWithPhoneNumber.linked_id) !== null && _j !== void 0 ? _j : contactWithPhoneNumber.id);
            const ans = {
                primaryContatctId: (_k = contactWithPhoneNumber.linked_id) !== null && _k !== void 0 ? _k : contactWithPhoneNumber.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            };
            return ans;
        }
    }
    if (contactWithEmail && contactWithPhoneNumber) {
        const primaryContact = contactWithEmail.id > contactWithPhoneNumber.id ? contactWithEmail : contactWithPhoneNumber;
        const secondaryContact = primaryContact === contactWithEmail ? contactWithPhoneNumber : contactWithEmail;
        const res = yield contactRepository
            .createQueryBuilder()
            .update(contactEntity_1.ContactEntity)
            .set({ link_precedence: 'secondary', linked_id: secondaryContact.id, updated_at: new Date() })
            .where("id = :id", { id: primaryContact.id })
            .execute();
        const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${secondaryContact.id} or id = ${secondaryContact.id}`;
        const result = yield contactRepository.query(re1);
        const { emails, phoneNumbers, secondaryContactIds } = yield clean_data(result, secondaryContact.email, secondaryContact.phone_number, secondaryContact.id);
        const ans = {
            primaryContatctId: secondaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        };
        return ans;
    }
    else {
        console.log("5");
        const newContact = new contactEntity_1.ContactEntity();
        newContact.email = email;
        newContact.phone_number = phone_number;
        newContact.link_precedence = 'primary';
        newContact.created_at = new Date();
        newContact.updated_at = new Date();
        newContact.deleted_at = null;
        const res = yield contactRepository.save(newContact);
        const ans = {
            primaryContatctId: res.id,
            emails: [res.email],
            phoneNumbers: [res.phone_number],
            secondaryContactIds: []
        };
        return ans;
    }
});
exports.createContact = createContact;
