const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "tuksonpets@gmail.com",
      pass: "uxoentmdlkoyyaai",
    },
  });

  module.exports= transporter