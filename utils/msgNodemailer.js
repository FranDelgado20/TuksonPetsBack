const transporter = require('../helpers/nodemailer')

const nuevaCuenta = async (userEmail) => {
    await transporter.sendMail({
        from:process.env.USER,
        to:userEmail,
        subject:'Bienvenido a Tukson Pets',
        html: 
        `
        <h2>Bienvenido a Tukson Pets</h2>
        <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
        <hr/>
        <p>Gracias por registrarte en nuestra página, aquí podras obtener diversos productos para tus mascotas ya que contamos con la mejor calidad del mercado, tambien podras consultar sobre los distintos planes que ofrecemos y solicitar turnos con nuestros profesionales. Gracias por confiar en nosotros! </p>
        <hr/>
        <a href="https://tukson-pets.vercel.app" >Ir a Tukson Pets</a>
        `
    })
}

const mensajePlan = async (userEmail) => {
    await transporter.sendMail({
        from:process.env.USER,
        to:userEmail,
        subject:'Consulta sobre tu plan',
        html: 
        `
        <h2>El equipo de Tukson Pets te informa:</h2>
        <img src="http://imgfz.com/i/Er3sK8w.png" alt="Logo"   />
        <hr/>
        <p>Hemos visto que has solicitado mas informacion acerca de uno de nuestros planes. Proximamente nos pondremos en contacto contigo, por favor espera pacientemente. Gracias por confiar en nosotros!</p>
        <hr/>
        <a href="https://tukson-pets.vercel.app" >Ir a Tukson Pets</a>
        `
    })
}

module.exports ={   
    nuevaCuenta,
    mensajePlan
}