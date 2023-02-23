'use strict'

const usersController = require('../controllers/user.controller');


exports.userRoutes = function(app){
    
    app.post('/api/login',usersController.loginUser);
    
    app.post('/api/register',usersController.registerUser);

    app.put('/api/updateUserImage',usersController.updateUserImage);

}
