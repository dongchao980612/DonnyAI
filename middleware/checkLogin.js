// middleware/checkLogin.js
module.exports = function (req, res, next) {
    // 这里简单地假设如果 req.session.user 存在，则表示用户已登录
    // 你需要根据实际情况来判断登录状态
    if (req.session && req.session.user) {
        next(); // 如果已登录，继续执行后续路由
    } else {
        res.redirect('/login'); // 如果未登录，跳转到登录页面
    }
};