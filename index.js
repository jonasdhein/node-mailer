require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.HOST_PORT,
    auth: {
        user: process.env.HOST_USER,
        pass: process.env.HOST_PASS
    }
});

const senderTest = {
    name: 'Jonas Mail',
    email: 'jdhein@univates.br'
}

const receiverTest = {
    email: 'teste@teste.com'
}

const mailContentTest = {
    subject: 'Hello email!',
    text: 'Envio de teste',
    html: '<h2>Envio de teste!</h2>'
}

async function sendEmail(transporter, sender, receiver, mailContent) {

    const mail = await transporter.sendMail({
        from: `"${sender.name}" ${sender.email}`,
        to: `${receiver.email}`, //pode inclusive ser uma lista de contatos
        subject: `${mailContent.subject}`,
        text: `${mailContent.text}`,
        html: `${mailContent.html}`
    })

    console.log('Email enviado: ', mail.messageId);
    console.log('URL do Ethereal: ', nodemailer.getTestMessageUrl(mail));

}

async function mailer() {
    try {

        await sendEmail(transporter, senderTest, receiverTest, mailContentTest);

    } catch (error) {
        console.log('ERRO: ', error)
    }
}

mailer();