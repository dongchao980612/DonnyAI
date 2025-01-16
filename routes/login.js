
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

// 设置会话
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 在生产环境中设置为 true
}));

// 登录页面
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});



// 登录路由
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 这里应该检查用户名和密码是否正确
    // 为了示例，我们假设用户名为 'admin'，密码为 'password'
    if (username === 'admin' && password === '123') {
        req.session.user = username; // 设置会话
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码错误' });
    }
});

module.exports = router;