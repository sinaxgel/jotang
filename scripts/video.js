window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.daohanglan');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


document.addEventListener("DOMContentLoaded", function() {

// 获取视频
let video = document.getElementById('videoPlayer');

// 这是网上查的一个东西，具体效果不太清楚，是个优化
let debounceTimeout;

function handleIntersection(entries) {
// 清楚超时，即避免短时间内多次触发，比如我们来回滑动
clearTimeout(debounceTimeout);


debounceTimeout = setTimeout(() => {
    entries.forEach(entry => {
        // 检查我们自己定义的视口与视频是否重合
        if (!entry.isIntersecting) {
            // 如果没有重合部分
            if (!document.pictureInPictureElement) {
                // 画中画
                video.requestPictureInPicture();
            }
        } else {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            }
        }
    });
}, 200); 
}

// 自己定义的视口
let options = {
    // null默认视口
root: null,
rootMargin: '0px',
threshold: [0, 0.25, 0.5, 0.75, 1]
};


let observer = new IntersectionObserver(handleIntersection, options);
observer.observe(video);

// 弹幕


const danmuToggle = document.querySelector('.danmu-kaiguan');
// 给开关加监听器
danmuToggle.addEventListener('click', function() {
    // 检查当前，是on则切换为off，换图标，反之亦然，因为这是个点击监听器，而非悬停
    if (danmuToggle.getAttribute('data-status') === 'on') {
        danmuToggle.src = 'images/关闭弹幕.png'; 
        danmuToggle.setAttribute('data-status', 'off');
    } else {
        danmuToggle.src = 'images/弹幕.png'; 
        danmuToggle.setAttribute('data-status', 'on');
    }
    // 再次检查，off就把所有弹幕设置为hidden，注意此时是隐藏，而非清除，我是为了更贴近b站
    if (danmuToggle.getAttribute('data-status') === 'off') {
    const allDanmus = document.querySelectorAll('.danmu');
    allDanmus.forEach(danmu => {
        danmu.style.visibility = 'hidden';
    });
} else {
    const allDanmus = document.querySelectorAll('.danmu');
    allDanmus.forEach(danmu => {
        danmu.style.visibility = 'visible';
    });
}
});

// 获取样式
const danmuFormat = document.querySelector('.danmu-yangshi');
const danmuFormatContainer = document.querySelector('.danmu-yangshi-container');

// 添加监听器
danmuFormat.addEventListener('click', function() {
    if (danmuFormatContainer.style.display === 'none') {
        danmuFormatContainer.style.display = 'block';
    } else {
        danmuFormatContainer.style.display = 'none';
    }
});

// 默认样式
let selectedColor = 'white';  
let selectedSize = 'medium';  


const colorOptions = document.querySelectorAll('.color-option');
// 为每个颜色选项设置监听器，点击时赋值给弹幕，
colorOptions.forEach(option => {
option.addEventListener('click', function() {
    
    // 这是赋值
    selectedColor = this.getAttribute('data-color');
    
    // 下面是改变选中时样式，即点击一个颜色选项后，为该选项添加一些样式使其能看出来被选中了
    colorOptions.forEach(opt => opt.classList.remove('selected'));
    
    this.classList.add('selected');
});
});


// 下面是大小，原理近似
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach(option => {
option.addEventListener('click', function() {
    selectedSize = this.getAttribute('data-size');
    
    sizeOptions.forEach(opt => opt.classList.remove('selected'));
    
    this.classList.add('selected');
});
});

// 然后就到了发弹幕环节，获取视频，输入的内容和发送按钮
const videoContainer = document.querySelector('.shipin');
const sendDanmuButton = document.getElementById('sendDanmu');
const danmuInput = document.getElementById('danmuInput');

// 点击监听器
sendDanmuButton.addEventListener('click', function() {
// 获取输入的值
    const danmuText = danmuInput.value;
// 存在则开始发
    if (danmuText) {
        // 新建一个div用于存储弹幕
    const danmuElem = document.createElement('div');
    danmuElem.className = 'danmu';
    danmuElem.textContent = danmuText;

    // 此时要先检查弹幕开关！！！没开不显示
            if (danmuToggle.getAttribute('data-status') === 'off') {
                danmuElem.style.visibility = 'hidden';
            }
            
            // 加到视频容器里
            videoContainer.appendChild(danmuElem);
            
            // 这里就是获取视频的宽度，使得弹幕从视频的一侧移动到另一侧，照猫画虎学的
    danmuElem.style.transform = `translateX(0px)`;
    danmuElem.setAttribute('data-target-position', `-${videoContainer.clientWidth + danmuElem.clientWidth}px`);

    // 这是随机的y轴，使得弹幕出现的位置随机
    const randomY = Math.random() * (videoContainer.clientHeight - 30);
    danmuElem.style.top = `${randomY}px`;
// 下面都是赋值
    danmuElem.style.color = selectedColor;

    if (selectedSize === 'small') {
        danmuElem.style.fontSize = '16px';
    } else if (selectedSize === 'large') {
        danmuElem.style.fontSize = '24px';
    } else {
        danmuElem.style.fontSize = '20px'; 
    }

    videoContainer.appendChild(danmuElem);
// 清空弹幕输入框
    danmuInput.value = '';
// 这是设置速度，
    setTimeout(() => {
        danmuElem.style.transform = `translateX(-${videoContainer.clientWidth + danmuElem.clientWidth}px)`;
    }, 10);
// 注意，当弹幕完成后，清除！一定要清楚，不然弹幕会越来越多，看不到好像不存在，其实都存在
    danmuElem.addEventListener('transitionend', function() {
        videoContainer.removeChild(danmuElem);
    });
}


// 恢复默认，即下次发送和选择时已经恢复默认了
 selectedColor = 'white'; 
selectedSize = 'medium';  

// 这是在给样式选择框里的选项恢复默认
colorOptions.forEach(opt => opt.classList.remove('selected'));
sizeOptions.forEach(opt => opt.classList.remove('selected'));
});

// 监听器，监听视频暂停与播放，同样是为了仿B站，视频暂停弹幕也暂停
video.addEventListener('play', resumeDanmus);
video.addEventListener('pause', pauseDanmus);

// 暂停的函数
function pauseDanmus() {
// 获取所有弹幕
const allDanmus = document.querySelectorAll('.danmu');
allDanmus.forEach(danmu => {
    // 对于每一个弹幕，获取水平位移，
    // transform是一个表示位置的字符串，其中第五个代表了当前的水平位置，后面就是在用分隔符来获取第四个部分，即第五个数
    // trim()则是清除空格，确保单独获取了有效数字
    // 至于为啥，我也不知道，查完说是定义就这样
    const currentPosition = getComputedStyle(danmu).transform.split(',')[4].trim();
    // 将弹幕的水平坐标设置成这个值，这样就是暂停了，因为水平坐标被固定了
    danmu.style.transform = `translateX(${currentPosition}px)`;
});
}

function resumeDanmus() {
const allDanmus = document.querySelectorAll('.danmu');
allDanmus.forEach(danmu => {
    // 获取弹幕的目标位置，也就是本来的终点，这个会在弹幕初始化时定义
    const targetPosition = danmu.getAttribute('data-target-position');
// 让弹幕移动到目标位置，也就是重新使其运动
    danmu.style.transform = `translateX(${targetPosition})`;
});
}


// 倍速

// 获取
const speedToggle = document.querySelector('.speed-kaiguan');
const speedFormatContainer = document.querySelector('.speed-yangshi-container');

// 点击事件显示与隐藏
speedToggle.addEventListener('click', function() {
if (speedFormatContainer.style.display === 'none' || !speedFormatContainer.style.display) {
    speedFormatContainer.style.display = 'block';
} else {
    speedFormatContainer.style.display = 'none';
}
});


const speedOptions = document.querySelectorAll('.speed-option');
// 保存选择的速度
speedOptions.forEach(option => {
option.addEventListener('click', function() {

    let speedValue = parseFloat(this.getAttribute('data-speed'));
    // 这个是视频的播放速度，将我们的值赋给视频
    video.playbackRate = speedValue;
    
    // 表明已选择
    speedOptions.forEach(opt => opt.classList.remove('selected'));
    this.classList.add('selected');
});
});


// 登录

// 获取，所有相关的内容
const avatar = document.querySelector('.daohanglan-you img');
const dengluKuang = document.getElementById('dengluKuang');
const dengluBtn = document.getElementById('dengluBtn');
const dengluInput = document.getElementById('dengluInput');
const querenBtn = document.getElementById('querenBtn');
const nownameInput = document.getElementById('nownameInput');
const nowName = document.getElementById('nowName');
const commentSendButton = document.getElementById('commentSendButton');


// 点击头像切换登录框的显示和隐藏
avatar.onclick = function() {
    toggleLoginPopup();
};

function toggleLoginPopup() {
    if (dengluKuang.style.display === 'none' || !dengluKuang.style.display) {
        dengluKuang.style.display = 'block';
    } else {
        dengluKuang.style.display = 'none';
    }
}

// 获取用户名并显示
function updateCurrentUsername() {

    // 从localstorage中取出
    const username = localStorage.getItem('username');
    
    if (username) {
        nowName.textContent = username;
    } else {
        nowName.textContent = '';
    }
}

// 检查当前的状态是已登录还是未登录，未登录的话显示登陆，已登陆才显示发送
function updateLoginStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        dengluBtn.textContent = '切换';
        commentSendButton.textContent = '发送';
        commentSendButton.classList.remove('login');
    } else {
        dengluBtn.textContent = '登录';
        commentSendButton.textContent = '登录';
        commentSendButton.classList.add('login');
    }
}

// 未登录点击评论区的登陆按钮，弹出登录框
dengluBtn.onclick = function() {
    if (dengluInput.style.display === 'none' || !dengluInput.style.display) {
        dengluInput.style.display = 'block';
    } else {
        dengluInput.style.display = 'none';
    }
};


// 登录时
querenBtn.onclick = function() {
    // 定义
    const username = nownameInput.value.trim();
    if (username) {
        // 用户名存入
        localStorage.setItem('username', username);
        // 显示用户名
        updateCurrentUsername();
        // 确认后隐藏登录框
        nownameInput.value = '';
        dengluInput.style.display = 'none';
        dengluKuang.style.display = 'none';
        // 更新评论与回复的按钮
        updateLoginStatus();

        updateReplyButtonStatus();  

    }
};

// 点击空白处隐藏
document.onclick = function(e) {
    if (!e.target.closest('.daohanglan-you') && !e.target.closest('.denglukuang')) {
        dengluKuang.style.display = 'none';
    }
};




// 评论
let comments = [];  // 初始化评论数组



// 渲染评论
function renderComments() {
    // 获取评论要显示的区域，清空，我们每次重新渲染
    const commentsDisplay = document.getElementById('commentsDisplay');
    commentsDisplay.innerHTML = '';

// 用户名
    const currentLoggedInUser = localStorage.getItem('username');

    // 遍历数组
    comments.forEach((comment, index) => {

        // 创建标签，赋予类，这是一个大容器
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');

        // 同样的流程
        const commentAvatar = document.createElement('img');
        commentAvatar.src = "images/avatar2.jpg";
        commentAvatar.alt = "用户头像";
        commentAvatar.classList.add('comment-avatar');

        // 定义一个类用于存放下面的一系列内容
        const commentTop = document.createElement('div');
        commentTop.appendChild(commentAvatar);

        // 定义用户名，并使其成为top的子元素，后续同理
        const commentUsername = document.createElement('div');
    commentUsername.textContent = comment.username;
    commentTop.appendChild(commentUsername);

        // 内容
        const commentText = document.createElement('div');
        commentText.textContent = comment.text;
        commentText.style.marginLeft = '50px';
    // 又定义了一个容器，用于存放第三行内容
        const commentTimeContainer = document.createElement('div');
        commentTimeContainer.classList.add('comment-time-container');
        // 时间
        const commentTime = document.createElement('div');
        commentTime.textContent = comment.time;
// 点赞
        const commentLikeIcon = document.createElement('img');
        commentLikeIcon.src = comment.liked ? "../images/已点赞.png" : "../images/点赞.png";
        commentLikeIcon.alt = "点赞图标";
        commentLikeIcon.classList.add('comment-like-icon');
        // 点赞功能，显示点击监听器
        commentLikeIcon.onclick = function() {
            // 用一个非逻辑来进行当前状态的切换
            comments[index].liked = !comments[index].liked;
            // 存入重新渲染，这样的话我们下次点开网页点赞的痕迹也能被保留
            saveCommentsToLocalStorage();
            renderComments();
        };
// 回复
        const commentReply = document.createElement('div');
        commentReply.classList.add('comment-reply');
        commentReply.textContent = '回复';
// 删除
        const deleteIcon = document.createElement('img');
        deleteIcon.src = "../images/删除.png";
        deleteIcon.alt = "删除图标";
        deleteIcon.classList.add('delete-icon');
        deleteIcon.style.display = 'none';  // 默认隐藏
        // 点击事件
        deleteIcon.onclick = function() {
            // 通过splice函数删除当前索引
            comments.splice(index, 1);
            // 存入重新渲染
            saveCommentsToLocalStorage();
            renderComments();
        };

        // 一次性存入到容器中
        commentTimeContainer.appendChild(commentTime);
        commentTimeContainer.appendChild(deleteIcon); 
        commentTimeContainer.appendChild(commentLikeIcon);
        commentTimeContainer.appendChild(commentReply);

    // 之前我们提到一开始创建了个大容器，现在把是三个小容器存入大容器
        commentItem.appendChild(commentTop);
        commentItem.appendChild(commentText);
        commentItem.appendChild(commentTimeContainer);

    // 鼠标悬停，
        commentItem.onmouseover = function() {
            // 获取当前用户名进行匹配
            const currentLoggedInUser = localStorage.getItem('username'); 
            if (currentLoggedInUser === comment.username) {
                // 显示删除图标
                deleteIcon.style.display = 'inline-block';
            }
        };
        commentItem.onmouseout = function() {
            deleteIcon.style.display = 'none';
        };
    
// 把评论加到评论区容器
commentsDisplay.appendChild(commentItem);

// 下面定义点击回复时弹出的回复框

        // 回复输入框的容器
        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-container');
        replyContainer.style.display = 'none'; // 使其初始隐藏

        // 回复的头像
        const replyAvatar = document.createElement('img');
        replyAvatar.src = "images/avatar2.jpg";
        replyAvatar.alt = "用户头像";
        replyAvatar.classList.add('reply-avatar');
        replyContainer.appendChild(replyAvatar);

        // 回复的输入框
        const replyInput = document.createElement('textarea');
        replyInput.classList.add('reply-input');
        replyInput.placeholder = "回复...";
        replyInput.onfocus = function() {
            replyInput.style.height = "60px";
        };
        replyContainer.appendChild(replyInput);

        // 回复的发送按钮
        const replySendButton = document.createElement('button');
        replySendButton.classList.add('reply-send');  // 添加类样式
        replySendButton.textContent = localStorage.getItem('username') ? '发送' : '登录';
        replyContainer.appendChild(replySendButton);

        // 将回复容器添加到评论项
        commentItem.appendChild(replyContainer);

        // 当点击“回复”时，显示或隐藏回复输入框
        commentReply.onclick = function() {
            if (replyContainer.style.display === 'none' || !replyContainer.style.display) {
                replyContainer.style.display = 'flex';
            } else {
                replyContainer.style.display = 'none';
            }
        };


        
// 回复的发送
replySendButton.onclick = function(event) {
    // 先匹配
    const username = localStorage.getItem('username');
    if (!username) {
        toggleLoginPopup();
        event.stopPropagation();
        return;
    }
// 获取，去除前后空格
    const replyText = replyInput.value.trim();
    if (replyText) {
// 为回复创建数据结构
        const now = new Date();

        const timeString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
        // 这里是回复的数据结构，这很重要，之后的回复就用这样的结构
        const reply = {
            username: username,
            text: replyText,
            time: timeString,
            liked: false
        };
         // 将回复添加到评论的replies数组中，这里是push，就是添加到下方
        comments[index].replies.push(reply); 
// 保存并渲染
        saveCommentsToLocalStorage();
        renderComments();
        replyInput.value = '';
        replyContainer.style.display = 'none';
    }
};

// 遍历回复数组
comments[index].replies.forEach((reply, replyIndex) => {
    const replyItem = document.createElement('div');
    replyItem.classList.add('reply-item');

// 创建头像和用户名的容器
const replyTop = document.createElement('div');
replyItem.appendChild(replyTop);

const replyAvatar = document.createElement('img');
replyAvatar.src = "images/avatar2.jpg";
replyAvatar.alt = "用户头像";
replyAvatar.classList.add('reply-avatar');
replyTop.appendChild(replyAvatar);

const replyUsername = document.createElement('div');
replyUsername.textContent = reply.username;
replyUsername.classList.add('reply-username');
replyTop.appendChild(replyUsername);

const replyLabel = document.createElement('div');
replyLabel.textContent = "回复";
replyLabel.classList.add('reply-label');
replyTop.appendChild(replyLabel);

const replyToUsername = document.createElement('div');
replyToUsername.textContent = comment.username;
replyToUsername.classList.add('reply-to-username');
replyTop.appendChild(replyToUsername);

const replyContent = document.createElement('div');
replyContent.textContent = reply.text;
replyContent.classList.add('reply-content');  // 添加类名以便之后自定义样式
replyTop.appendChild(replyContent);


// 创建时间和点赞图标的容器
const replyTimeContainer = document.createElement('div');
replyItem.appendChild(replyTimeContainer);

const replyTime = document.createElement('div');
replyTime.textContent = reply.time;
replyTime.classList.add('reply-time');

const replyLikeIcon = document.createElement('img');
replyLikeIcon.src = reply.liked ? "../images/已点赞.png" : "../images/点赞.png";
replyLikeIcon.alt = "点赞图标";
replyLikeIcon.classList.add('reply-like-icon');
replyLikeIcon.onclick = function() {
    reply.liked = !reply.liked; 
    saveCommentsToLocalStorage();
    renderComments();
};


    // 删除图标
    const replyDeleteIcon = document.createElement('img');
    replyDeleteIcon.src = "../images/删除.png";  
    replyDeleteIcon.alt = "删除图标";
    replyDeleteIcon.classList.add('reply-delete-icon');  
    replyDeleteIcon.style.display = 'none'; 
    
    replyDeleteIcon.onclick = function() {
        comments[index].replies.splice(replyIndex, 1);
        saveCommentsToLocalStorage();
        renderComments();
    };


    replyTimeContainer.appendChild(replyTime);
    replyTimeContainer.appendChild(replyLikeIcon);

    replyTimeContainer.appendChild(replyDeleteIcon);
    replyItem.appendChild(replyTimeContainer);

    
    replyItem.onmouseover = function() {
        const currentLoggedInUser = localStorage.getItem('username'); 
        if (currentLoggedInUser === reply.username) {
            replyDeleteIcon.style.display = 'inline-block';
        }
    };
    replyItem.onmouseout = function() {
        replyDeleteIcon.style.display = 'none';
    };


    commentsDisplay.appendChild(replyItem);
});



});

}


// 这个函数用户回复按钮的登录检测
function updateReplyButtonStatus() {
    const replySendButtons = document.querySelectorAll('.reply-send');
    const username = localStorage.getItem('username');
    replySendButtons.forEach(replySendButton => {
        if (!username) {
            replySendButton.classList.add('login'); 
            replySendButton.textContent = '登录';
        } else {
            replySendButton.classList.remove('login'); 
            replySendButton.textContent = '发送';
        }
    });
}

const commentInput = document.querySelector('.comment-input');

// 将评论保存到localStorage，以json形式
function saveCommentsToLocalStorage() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// 从localStorage读取评论
function loadCommentsFromLocalStorage() {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
        comments = JSON.parse(savedComments);
    }
}


// 发送评论
commentSendButton.onclick = function(event) {
    // 先检测
    const username = localStorage.getItem('username');
    if (!username) {
        toggleLoginPopup();
        event.stopPropagation();
        return;
    }
// 获取
    const commentText = commentInput.value.trim();
    if (commentText) {
        const now = new Date();
        const timeString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
        const comment = {
            username: username,
            text: commentText,
            time: timeString,
            liked: false,
            // 在评论的输入结构中另外需要一个数组，这个数组用于存储他的回复
            replies:[]
        };
        // unshift添加到上方
        comments.unshift(comment);  
// 存入并渲染
        saveCommentsToLocalStorage();
        renderComments();
        commentInput.value = '';
    }
};


// 把所有东西取出来然后渲染上
function initialize() {
    // 移除localStorage中的username，实现刷新页面自动退出登录
    localStorage.removeItem('username');
    updateLoginStatus();
    updateCurrentUsername();

    loadCommentsFromLocalStorage();  
    renderComments();  

    updateReplyButtonStatus();

}


// 页面加载时进行初始化，记得得调用函数
initialize();



});

