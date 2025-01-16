document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 发送注册请求
    fetch('/register/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('注册成功，请登录');
                window.location.href = '/login.html'; // 注册成功，跳转到登录页面
            } else {
                alert('注册失败：' + data.message);
            }
        })
        .catch(error => {
            console.error('注册请求失败:', error);
            alert('注册请求失败');
        });
});