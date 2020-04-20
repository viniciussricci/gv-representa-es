const { Router } = require('express');

const Usercontroller = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');
const checkRole = require('./app/middlewares/Roles');

const routes = new Router();

routes.post('/session', SessionController.store);

// Todas as rotas abaixo desse middleware precisarão de autenticação
routes.use(authMiddleware);

routes.use(checkRole('ADMIN'));
routes.post('/users', Usercontroller.store);
routes.get('/users', Usercontroller.show);
routes.delete('/users/:id', Usercontroller.delete);

module.exports = routes;
