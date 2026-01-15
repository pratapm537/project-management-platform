import Mailgen from "mailgen";

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
    forgotPasswordMailgenContent
}