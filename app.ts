import { NextFunction } from "connect";
import express, { Application, Request, Response } from "express";
import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";
const app: Application = express();
app.use(express.json());

app.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email } = req.body;
      const transporter: Transporter = nodemailer.createTransport({
        port: 465, // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
          user: "mmt161627@gmail.com",
          pass: "muhammad2959",
        },
        secure: true,
      });
      

      const mailData = {
        from: "mmt161627@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
      };

      await transporter.sendMail(mailData);

      res.status(200).json({ message: "Successfully sent" });
    } catch (error) {
      next(error);
    }
  }
);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});

app.listen(4000);
