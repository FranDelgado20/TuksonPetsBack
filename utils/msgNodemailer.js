// const transporter = require('../helpers/nodemailer')

// const nuevaCuenta = async (userEmail) => {
// try {
//         await transporter.sendMail({
//             from:process.env.USER,
//             to:userEmail,
//             subject:'Bienvenido a Tukson Pets',
//             html: 
//             `
//             <h2>Bienvenido a Tukson Pets</h2>
//             <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
//             <hr/>
//             <p>Gracias por registrarte en nuestra página, aquí podras obtener diversos productos para tus mascotas ya que contamos con la mejor calidad del mercado, tambien podras consultar sobre los distintos planes que ofrecemos y solicitar turnos con nuestros profesionales. Gracias por confiar en nosotros! </p>
//             <hr/>
//             <a href="https://tukson-pets.vercel.app" >Ir a Tukson Pets</a>
//             `
//         })
// } catch (error) {
//     console.log(error)
// }
// }

// const mensajePlan = async (userEmail) => {
// try {
//         await transporter.sendMail({
//             from:process.env.USER,
//             to:userEmail,
//             subject:'Consulta sobre tu plan',
//             html: 
//             `
//             <h2>El equipo de Tukson Pets te informa:</h2>
//             <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
//             <hr/>
//             <p>Hemos visto que has solicitado mas informacion acerca de uno de nuestros planes. Proximamente nos pondremos en contacto contigo, por favor espera pacientemente. Gracias por confiar en nosotros!</p>
//             <hr/>
//             <a href="https://tukson-pets.vercel.app" >Ir a Tukson Pets</a>
//             `
//         })
// } catch (error) {
//     console.log(error)
// }
// }

// module.exports ={   
//     nuevaCuenta,
//     mensajePlan
// }
const nodemailer = require("nodemailer");

async function enviarCorreo(transporter, mailOptions) {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: ", info.response);
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
}

async function sendPlanEmail(userEmail) {
  try {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: userEmail,
      subject: "Consulta sobre tu plan",
      html: `
        <h2>El equipo de Tukson Pets te informa:</h2>
        <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
        <hr/>
        <p>Hemos visto que has solicitado más información acerca de uno de nuestros planes. Próximamente nos pondremos en contacto contigo, por favor espera pacientemente. Gracias por confiar en nosotros!</p>
        <hr/>
        <a href="https://tukson-pets.vercel.app">Ir a Tukson Pets</a>
      `,
    };

    enviarCorreo(transporter, mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo del plan: ", error);
  }
}

async function sendWelcomeEmail(userEmail) {
  try {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: userEmail,
      subject: "Bienvenido a Tukson Pets",
      html: `
        <h2>Bienvenido a Tukson Pets</h2>
        <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
        <hr/>
        <p>Gracias por registrarte en nuestra página, aquí podrás obtener diversos productos para tus mascotas ya que contamos con la mejor calidad del mercado, también podrás consultar sobre los distintos planes que ofrecemos y solicitar turnos con nuestros profesionales. ¡Gracias por confiar en nosotros!</p>
        <hr/>
        <a href="https://tukson-pets.vercel.app">Ir a Tukson Pets</a>
      `,
    };

    enviarCorreo(transporter, mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida: ", error);
  }
}

module.exports = {
    sendPlanEmail, sendWelcomeEmail
}
// // Llamamos a las funciones para enviar los correos
// sendPlanEmail("correo_destino1@example.com");
// sendWelcomeEmail("correo_destino2@example.com");