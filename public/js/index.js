document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');


    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userInput = messageInput.value.trim();
        if (userInput) {
            addMessage('user-message', userInput);
            // 使用fetch发送消息到后端并获取回复
            fetch('/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ req_message: userInput }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        addMessage('assistant-message', data);
                    } else {
                        addMessage('assistant-message', '抱歉，我没有理解你的问题。');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    addMessage('assistant-message', '抱歉，出现了一些错误。');
                });
            messageInput.value = '';
        }
    }

    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        // 创建消息内容元素
        const messageContent = document.createElement('div');
        messageContent.textContent = message;

        // 创建头像元素
        const avatarImg = document.createElement('img');
        if (sender === 'user-message') {
            avatarImg.src = 'img/user-avatar.png';
            avatarImg.alt = 'User Avatar';
            avatarImg.style.marginLeft = '10px'; // 用户头像的左边距
        } else if (sender === 'assistant-message') {
            avatarImg.src = 'img/assistant-avatar.png';
            avatarImg.alt = 'Assistant Avatar';
            avatarImg.style.marginRight = '10px'; // 助手头像的右边距
        }
        avatarImg.style.width = '40px';
        avatarImg.style.height = '40px';
        avatarImg.style.borderRadius = '50%';

        // 根据发送者角色调整消息和头像的排列顺序
        if (sender === 'user-message') {
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(avatarImg);
        } else if (sender === 'assistant-message') {
            messageDiv.appendChild(avatarImg);
            messageDiv.appendChild(messageContent);
        }

        // 滚动到消息列表底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // 将消息元素添加到消息列表中
        chatMessages.appendChild(messageDiv);

    }


});