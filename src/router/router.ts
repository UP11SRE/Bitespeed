import express, { Router, Request, Response } from 'express';
import { identify } from '../controller/contactController';


const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
   res.status(200).json({message : "Dude You are on wrong side...."})
});

router.post("/identify", identify);

export default router;
