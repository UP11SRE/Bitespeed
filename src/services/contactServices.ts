import { Request } from 'express';
import {createContact } from '../repository/contactRepository';
import { ContactEntity } from '../models/contactEntity'; 

const identifyContact = async (email: string, phoneNumber: any): Promise<any> => {

  try{

  email = String(email).toLowerCase();
  phoneNumber = String(phoneNumber).toLowerCase();

  const res = await createContact(email,phoneNumber);

  return res;
  }
  catch(error){
    console.log("something went wrong", error);
    return;
  }
};




export { identifyContact };
