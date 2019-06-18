//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let config = require('../config/appconfig.json');
let should = chai.should();
let expect = chai.expect;
let Chance = require('chance');
let chance = new Chance();

chai.use(chaiHttp);

describe('User', function () {

    // Usuario 1 
    let usuario_1 = {
        "nome": chance.name(),
        "email": "email@testes." + chance.natural({ min: 2000, max: 968416466 }),
        "senha": "123456",
        "telefones": [
            {
                "ddd": "21",
                "numero":"12345678"
            },
            {
                "ddd": "22",
                "numero":"22115678"
            },
            {
                "ddd": "31",
                "numero":"445545678"
            }
        ]

    };

    let id_usuario1_criado;

    // Usuario 1 
    let usuario_2 = {
        "nome": chance.name(),
        "email": "email@testes." + chance.natural({ min: 2000, max: 968416466 }),
        "senha": "123456",
        "telefones": [
            {
                "ddd": "23",
                "numero":"445545671"
            },
            {
                "ddd": "62",
                "numero":"2561348"
            },
            {
                "ddd": "81",
                "numero":"78545678"
            }
        ]

    };
    let id_usuario2_criado;

    it('consegue criar o primeiro usuario ?', (done) => {
        chai.request(config.apiUrl)
            .post('/sign/up')
            .send(usuario_1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.should.have.property('token');
                res.body.user.should.be.a('object');
                res.body.user.should.have.property('_id');
                res.body.user.should.have.property('nome').eql(usuario_1.nome);
                res.body.user.should.have.property('email').eql(usuario_1.email);
                res.body.user.should.not.have.property('senha');
                res.body.user.telefones.should.be.a('array');

                id_usuario1_criado = res.body.user._id;

                done();
        });
    });

    let token_usuario2;

    it('consegue criar os segundo usuario ?', (done) => {
        chai.request(config.apiUrl)
            .post('/sign/up')
            .send(usuario_2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.should.have.property('token');
                res.body.user.should.be.a('object');
                res.body.user.should.have.property('_id');
                res.body.user.should.have.property('nome').eql(usuario_2.nome);
                res.body.user.should.have.property('email').eql(usuario_2.email);
                res.body.user.should.not.have.property('senha');
                res.body.user.telefones.should.be.a('array');

                id_usuario2_criado = res.body.user._id;

                token_usuario2 = res.body.token;

                done();
        });
    });

    it('consegue encontrar o primeiro usuario c/ auth do segundo usuario ?', (done) => {
        chai.request(config.apiUrl)
            .get('/search/'+id_usuario1_criado)
            .set('Authorization', 'Bearer '+token_usuario2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('nome').eql(usuario_1.nome);
                res.body.should.have.property('email').eql(usuario_1.email);
                res.body.should.not.have.property('senha');
                res.body.telefones.should.be.a('array');

                done();
        });
    });

    let token_usuario1;

    it('consegue autenticar o primeiro usuario ?', (done) => {
        chai.request(config.apiUrl)
            .post('/sign/in')
            .send(usuario_1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.should.have.property('token');
                res.body.user.should.be.a('object');
                res.body.user.should.have.property('_id');
                res.body.user.should.have.property('nome').eql(usuario_1.nome);
                res.body.user.should.have.property('email').eql(usuario_1.email);
                res.body.user.should.not.have.property('senha');
                res.body.user.telefones.should.be.a('array');

                token_usuario1 = res.body.token;

                done();
        });
    });

    it('consegue encontrar o segundo usuario c/ auth do primeiro usuario ?', (done) => {
        chai.request(config.apiUrl)
            .get('/search/'+id_usuario2_criado)
            .set('Authorization', 'Bearer '+token_usuario1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('nome').eql(usuario_2.nome);
                res.body.should.have.property('email').eql(usuario_2.email);
                res.body.should.not.have.property('senha');
                res.body.telefones.should.be.a('array');

                done();
        });
    });
});

