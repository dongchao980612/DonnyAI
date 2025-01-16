document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 发送登录请求
    fetch('/login/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/index.html'; // 登录成功，跳转到 index.html
            } else {
                alert('登录失败：' + data.message);
            }
        })
        .catch(error => {
            console.error('登录请求失败:', error);
            alert('登录请求失败');
        });
});