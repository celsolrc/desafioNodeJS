const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function geraToken( params = {}){
    return jwt.sign( params, authConfig.secret, { expiresIn: authConfig.expires} );
}

router.post('/up', async(req, res) => {
    const {email} = req.body;
    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'E-mail já existente'} );


        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({ user, token : geraToken({id:user.id}) });
    } catch (err) {
        // Mensagens não tratadas
        return res.status(400).send( { error: err.errmsg });
    }
});

router.post('/in', async(req, res) => {
    const {email, senha} = req.body;

    const user = await User.findOne({email}).select('+senha');

    if ( (!user) || (!await bcrypt.compare(senha, user.senha)) ) 
        return res.status(400).send('Usuário e/ou senha inválidos.');

    user.senha = undefined;

    const token = jwt.sign( { id: user.id}, authConfig.secret, { expiresIn: authConfig.expires} );

    return res.send({ user, token : geraToken({id:user.id}) });
});

module.exports = app => app.use('/sign', router);