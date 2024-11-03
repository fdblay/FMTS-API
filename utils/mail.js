import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kumahfrederick2@gmail.com",
        pass: process.env.MAIL_PASS_KEY
    },
    from: "kumahfrederick2@gmail.com"
})