module.exports = (app) => {
    const account = require('../controller/accountController');

    //user sign up, create account for user
    app.post('/user/register', account.createAcc);

    //user login,
    app.post('/user/login', account.checkAcc);

    //user login out
    app.get('/user/loginOut', account.loginOut);
    //get a user
    //app.get('/user/info', account.getUser);

    //check login
    app.get('/user/info', account.checkLogin);

    //get all users
    app.get('/users',account.getUsers);

    //push history
    app.post('/user/pushHis', account.pushHis);

    //get history
    app.get('/user/getHis', account.getHis);
};
