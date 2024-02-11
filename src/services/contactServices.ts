import { Request } from 'express';
import {createContact } from '../repository/contactRepository';
import { ContactEntity } from '../models/contactEntity'; 

const identifyContact = async (email: string, phoneNumber: any): Promise<any> => {

  email = String(email).toLowerCase();
  phoneNumber = String(phoneNumber).toLowerCase();

  const res = await createContact(email,phoneNumber);

  return res;
};




export { identifyContact };
