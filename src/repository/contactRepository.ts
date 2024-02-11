import { getRepository } from 'typeorm';
import { ContactEntity } from '../models/contactEntity';
import { query } from 'express';

const createContact = async (email: string, phone_number: string): Promise<any> => {

  try{

  const clean_data = async(result : any, email: any, phone_number: any, pid: any): Promise<any> =>{


    const uniqueEmails = new Set();

     result.forEach((item: { email: any; }) => {
     uniqueEmails.add(item.email);
     uniqueEmails.add(email);
     });
    
     const uniqueNumber = new Set();
     
     result.forEach((item: { phone_number: any; }) => {
      uniqueNumber.add(item.phone_number);
      uniqueNumber.add(phone_number);
      });

    const emails = Array.from(uniqueEmails).filter(email => email !== "null");
    const phoneNumbers = Array.from(uniqueNumber).filter(phone_number => phone_number !== "null");;

    const ids = new Set();
     
     result.forEach((item: { id: any; }) => {
      ids.add(item.id);
     
      });

      const secondaryContactIds = Array.from(ids).filter(id => id !== pid);

      return {emails,phoneNumbers,secondaryContactIds};

  }

  const contactRepository = getRepository(ContactEntity);

    const existingContact = await contactRepository.findOne({ where: { email, phone_number } });
  if (existingContact) {
    if(existingContact.linked_id){
    const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${existingContact.linked_id} or id = ${existingContact.linked_id}`;
    const result = await contactRepository.query(re1);

    const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,existingContact.email,existingContact.phone_number,existingContact.linked_id)

    const ans = {
      primaryContatctId: existingContact.linked_id,
      emails,
      phoneNumbers,
      secondaryContactIds
    };
     
        return ans;
  }
  
  const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${existingContact.id} or id = ${existingContact.id}`;
  const result = await contactRepository.query(re1);

  const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,existingContact.email,existingContact.phone_number,existingContact.id)

  const ans = {
    primaryContatctId: existingContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds
  };

  return ans;
   
  }
  
  const [contactWithEmail, contactWithPhoneNumber] = await Promise.all([
    contactRepository.findOne({ where: { email } }),
    contactRepository.findOne({ where: { phone_number } }),
  ]);
   if (contactWithEmail && !contactWithPhoneNumber) {
    if(phone_number === "null" ){
      if(contactWithEmail.linked_id){
        const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithEmail.linked_id} or id = ${contactWithEmail.linked_id}`;
        const result = await contactRepository.query(re1);
    
        const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,contactWithEmail.email,"null",contactWithEmail.linked_id)

        const ans = {
          primaryContatctId: contactWithEmail.linked_id,
          emails,
          phoneNumbers,
          secondaryContactIds
        };
         
        return ans;
      }
      const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithEmail.id} or id = ${contactWithEmail.id}`;
      const result = await contactRepository.query(re1);

      const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,contactWithEmail.email,"null",contactWithEmail.id)

     const ans = {
       primaryContatctId: contactWithEmail.id,
       emails,
       phoneNumbers,
       secondaryContactIds
     };
      
    
      return ans;
    }
  
      else{
    
    const newContact = new ContactEntity();
    newContact.email = email;
    newContact.phone_number = phone_number;   
    newContact.linked_id = contactWithEmail.linked_id ?? contactWithEmail.id;
    newContact.link_precedence = 'secondary';
    newContact.created_at = new Date();
    newContact.updated_at = new Date();
    newContact.deleted_at = null;

    const savedContact = await contactRepository.save(newContact);

    const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithEmail.linked_id ?? contactWithEmail.id} or id = ${contactWithEmail.linked_id ?? contactWithEmail.id}`;
    const result = await contactRepository.query(re1);


    const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,contactWithEmail.email,contactWithEmail.phone_number,contactWithEmail.linked_id ?? contactWithEmail.id)

    const ans = {
      primaryContatctId: contactWithEmail.linked_id ?? contactWithEmail.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    };

    return ans;
    
    }
  }

  if (!contactWithEmail &&  contactWithPhoneNumber) {
    if(email === "null"){
      if(contactWithPhoneNumber.linked_id){
        const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithPhoneNumber.linked_id} or id = ${contactWithPhoneNumber.linked_id}`;
        const result = await contactRepository.query(re1);
    
        const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,"null",contactWithPhoneNumber.phone_number,contactWithPhoneNumber.linked_id)

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
      const result = await contactRepository.query(re1);
      console.log("checking the result-1", result);
    
      const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,"null",contactWithPhoneNumber.phone_number,contactWithPhoneNumber.id)

        const ans = {
          primaryContatctId: contactWithPhoneNumber.id,
          emails,
          phoneNumbers,
          secondaryContactIds
        };
    
      return ans;
       
    }
     
    else{
      console.log("32");
    const newContact = new ContactEntity();
    newContact.email = email;
    newContact.phone_number = phone_number;
    newContact.linked_id = contactWithPhoneNumber.linked_id ?? contactWithPhoneNumber.id;
    newContact.link_precedence = 'secondary';
    newContact.created_at = new Date();
    newContact.updated_at = new Date();
    newContact.deleted_at = null;

    const savedContact = await contactRepository.save(newContact);

    const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${contactWithPhoneNumber.linked_id ?? contactWithPhoneNumber.id} or id = ${contactWithPhoneNumber.linked_id ?? contactWithPhoneNumber.id}`;
    const result = await contactRepository.query(re1);

    const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,contactWithPhoneNumber.email,contactWithPhoneNumber.phone_number,contactWithPhoneNumber.linked_id ?? contactWithPhoneNumber.id)
 
    const ans = {
      primaryContatctId: contactWithPhoneNumber.linked_id ?? contactWithPhoneNumber.id,
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



    const res = await contactRepository
    .createQueryBuilder()
    .update(ContactEntity)
    .set({ link_precedence: 'secondary', linked_id: secondaryContact.id, updated_at: new Date() })
    .where("id = :id", { id: primaryContact.id })
    .execute();
  
    const re1 = `SELECT email, phone_number, id FROM contact_entity WHERE linked_id = ${secondaryContact.id} or id = ${secondaryContact.id}`;
    const result = await contactRepository.query(re1);

    const {emails,phoneNumbers,secondaryContactIds} = await clean_data(result,secondaryContact.email,secondaryContact.phone_number,secondaryContact.id)

    

    const ans = {
      primaryContatctId: secondaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    };


    return ans;
  } else {
    console.log("5");
    const newContact = new ContactEntity();
    newContact.email = email;
    newContact.phone_number = phone_number;
    newContact.link_precedence = 'primary'; 
    newContact.created_at = new Date();
    newContact.updated_at = new Date();
    newContact.deleted_at = null;

    const res =  await contactRepository.save(newContact);

    const ans = {
      primaryContatctId: res.id,
    emails: [res.email],
    phoneNumbers: [res.phone_number],
    secondaryContactIds: []
  }
  return ans;
}
  }
  catch(error){
    console.log("something went wrong", error);
    return;
  }
};

export { createContact };
