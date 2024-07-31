const nodemailer = require('nodemailer');

async function sendEmail(name, email, phone, message, type) {
    console.log("Préparation de l'envoi d'email avec les variables d'environnement:", {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    });

    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New ${type} message from ${name}`,
        text: `You have received a new message from ${name} (${email}, ${phone}): ${message}`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.log("Error sending email: " + error.message);
        throw error;
    }
}

module.exports = sendEmail;