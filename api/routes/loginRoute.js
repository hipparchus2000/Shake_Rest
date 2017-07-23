module.exports = (app) => {
  let loginList = require('../controllers/loginController');
  app.route('/logins')
    .get(loginList.getBlogs) 
    .post(loginList.createBlog);
  app.route('/logins/:loginId')
    .get(loginList.readBlog)
    .put(loginList.updateBlog)
    .delete(loginList.deleteBlog);
}


