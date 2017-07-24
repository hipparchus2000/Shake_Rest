module.exports = (app) => {
  let loginList = require('../controllers/loginController');
  app.route('/login')
    .get(loginList.getLogins) 
    .post(loginList.createLogin);
  app.route('/login/:loginId')
    .get(loginList.readLogin)
    .put(loginList.updateLogin)
    .delete(loginList.deleteLogin);
}


