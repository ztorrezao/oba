import { Router } from 'express';
import KioniBot from '../controllers/KioniBot';


const botRouter = Router();

botRouter.post('/incoming', KioniBot.googleSearch);

export default botRouter;
