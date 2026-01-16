import Mailgen from "mailgen"
import nodemailer from "nodemailer"

const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "http://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailhtml = mailGenerator.generate(options.mailgenContent)

    nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP__HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailhtml
    };

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credential in the .env file")
        console.error("Error: ", error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
        name: "Welcome to our App, We are excited to have you on board",
        intro: "To verify your email please click on the following button",
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your email  ',
                link: verificationUrl
            }
        },
        outro: "Need help or have questions? just reply to this email, we would love to help"
    }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
        name: "We got a request to rest a password of your account",
        intro: "To reset your password, click on the following button or link",
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#d73b36', // Optional action button color
                text: "Reset password",
                link: passwordResetUrl
            }
        },
        outro: "Need help or have questions? just reply to this email, we would love to help"
    }
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendMail
}