const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const router = express.Router();
const OpenAI = require('openai');
const checkLogin = require('../middleware/checkLogin');
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-465db1f26dea49788188191dceaf8533'
});



router.use(express.json()); // 使用中间件解析JSON格式的请求体
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true })); // 用于解析URL编码的表单数据

// 主页面
router.get('/', checkLogin, function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});



// AI Model endpoint
router.post('/completions', async (req, res) => {
    const { req_message } = req.body;
    // Call DeepSeek API
    // console.log(req_message);
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: req_message }],
        model: "deepseek-chat",
    });
    let res_message = completion.choices[0].message.content
    res.status(201).json(res_message);
});



module.exports = router;