const express = require('express');
const OngController = require ('./controllers/OngController');
const IncidentController = require ('./controllers/IncidentController');
const SessionController = require ('./controllers/SessionController');
const ProfileController = require ('./controllers/ProfileController');
const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.get );
routes.post('/ongs', OngController.create);

routes.get('/incident', IncidentController.get );
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);


routes.get('/profile', ProfileController.index);

module.exports = routes;