const express = require('express');
const authMiddleware = require('../middleware/auth');

const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', async(req, res) => {
    const id = req.params.id;

    if (id === undefined )
        return res.status(400).send({ error: 'id não informado'} );


    User.findOne({_id: id}, function (err, user) { 
        if (err)
            return res.status(400).send({ error: 'id não encontrado'} );

        res.send( user);
     });
});

module.exports = app => app.use('/search', router);