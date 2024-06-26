import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
dotenv.config();

export const corsOptions = {
    // ERROR CORS https://youtu.be/-9d3KhCqOtU?feature=shared&t=4752
    origin: process.env.ORIGIN.split(" "),
    optionsSuccessStatus: 200,
};

// https://youtu.be/9jK-NcRmVcw?si=cD5RYnpfbjaI-wA0
export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // minutes 
    max: parseInt(process.env.LIMIT_REQUEST), // max request by minutes
    message: 'To many request, try after 5 minutes',
  });