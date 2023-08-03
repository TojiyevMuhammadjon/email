"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/", async (req, res, next) => {
    try {
        const { email } = req.body;
        const transporter = nodemailer_1.default.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "@gmail.com",
                pass: "", //your password here
            },
            secure: true,
        });
        const mailData = {
            from: "mmt161627@gmail.com",
            to: `${email}`,
            subject: "Sending Email using Node.js",
            text: "That was easy!",
            html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
        };
        await transporter.sendMail(mailData);
        res.status(200).json({ message: "Successfully sent" });
    }
    catch (error) {
        next(error);
    }
});
app.use((err, req, res, next) => {
    console.log(err);
});
app.listen(4000);
