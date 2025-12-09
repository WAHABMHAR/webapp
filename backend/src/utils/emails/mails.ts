import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});

export const verficationEmail = async (email: string, name: string, token: string) => {
    console.log("Credetaials", {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    });
    const baseUrl = process.env.FRONTEND_URL || process.env.BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/users/verify/${token}`;
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please click on the link below to confirm your email address:</p>
        <p>Verify Your Email</p>
        <a href=${url}>${url}</a>
        
        `,
    };
    await transporter.sendMail(mailOptions);
};
