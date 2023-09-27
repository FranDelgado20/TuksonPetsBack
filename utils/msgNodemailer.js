const transporter = require('../helpers/nodemailer')

const sendMail = async () => {
    await transporter.sendMail({
        from:'tuksonpets@gmail.com',
        to:'tuksonpets@gmail.com',
        subject:'Mensaje de prueba',
        html: `
        <p>Mensaje enviado</p>
        `
    })
}
module.exports ={   
    sendMail
}