const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// 注册路由
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // 这里应该检查用户名和邮箱是否已存在
    // 为了示例，我们假设用户名和邮箱必须唯一
    if (username === 'admin' || email === 'admin@example.com') {
        res.json({ success: false, message: '用户名或邮箱已存在' });
    } else {
        // 假设注册成功，实际应用中应将用户信息存储到数据库
        res.json({ success: true });
    }
});

// 404 页面
router.use((req, res) => {
    res.status(404).send('');
});


module.exports = router;