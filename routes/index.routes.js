require('dotenv').config({ allowEmptyValues: true });
const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const router = Router();


router.get('/Curriculum-Franco', (req, res)=>{

    const ruta = path.join(__dirname , '../public/CVFrancoSarabia.pdf');

    fs.readFile(ruta, function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });

    //res.sendFile(ruta)
});

router.post('/api/send-email', async (req, res) => {

    const { from, subject, message, nameLastName, phone } = req.body;

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SECRET_EMAIL,
            pass: process.env.SECRET_PASSWORD
        },
    }

    const messageOptions = {
        from: from,
        to: process.env.SECRET_EMAIL,
        subject: subject,
        html: `
            <p>${ nameLastName } - ${ phone }</p> 
            <p>${ message }</p>
            <br><br>
            <p>Atentamente... ${ from }</p>
        `
    }
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(messageOptions);

    await transport.verify().then(() => {
        res.status(201).json(
            { 
                ok: true,
                message: 'Correo enviado exitosamente !!!'
            }
        );
    }).catch(err => {
        res.status(500).json(
            { 
                ok: false,
                error: err
            }
        );
    });


    /*const { to, subject, text, html } = req.body;

    const msg = { 
        to: 'franco.gb17@gmail.com', 
        from: 'franco.gb17@gmail.com', 
        subject: 'sljd', 
        text: 'sljdl', 
        html: '', 
        sandboxMode: true 
    }

    try {
        await sgMail.send(msg)
    }catch(err) {
        return res.status(404).send(err.message);
    }

    res.status(201).send({ success: true });*/
})

module.exports = router;