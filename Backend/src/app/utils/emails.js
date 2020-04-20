const debug = require('debug')('api-gv');
const nodemailer = require('nodemailer');

const sendEmail = async (req) => {
  const { name, email, password } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '38d5284359ffd7',
      pass: '86fcd322e9083b',
    },
  });

  transporter
    .sendMail({
      from: 'Gv Repesentações <38d5284359ffd7>',
      to: `${email}`,
      subject: `Bem-vindo a GV Representações`,
      html: `Olá <strong>${name}</strong>,<br/> seu acesso na GV foi criado, para acessar sua conta basta utilizar o email e senha cadastrados. <br/><br/> 
      <strong> Email: </strong>${email}<br/><strong> Senha: </strong>${password}<br/><br/> Obrigado e boas Vendas!`,
    })
    .then((message) => {
      debug(message);
    })
    .catch((err) => {
      debug(err);
    });
};

module.exports = { sendEmail };
