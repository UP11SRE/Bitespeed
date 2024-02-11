import { Request, Response } from 'express';
import { identifyContact } from '../services/contactServices';

const identify = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, phoneNumber} = req.body;
    if(!email && !phoneNumber){
      res.status(400).json({ message : "Both value are null"});
    }
   
    const contacts = await identifyContact(email,phoneNumber);
    res.status(200).json({ contact: contacts });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { identify };
