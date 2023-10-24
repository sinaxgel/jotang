// 文档内容完全加载后再执行
document.addEventListener("DOMContentLoaded", function() {
    // 手风琴效果

    // 获取照片存在photos中
    const photos = document.querySelectorAll("#photo-wall figure");
    // 对于每一个figure
    photos.forEach(figure => {
        // 设置监听器，鼠标悬停时
        figure.addEventListener("mouseover", function() {
            // 调整宽度，显示描述
            figure.style.width = "300px";
            figure.querySelector("figcaption").style.display = "block";
        });
        // 鼠标移走时
        figure.addEventListener("mouseout", function() {
            // 回复大小，隐藏描述
            figure.style.width = "150px";
            figure.querySelector("figcaption").style.display = "none";
        });
    });

    // 文章搜索功能
    // 获取搜索按钮
    const searchBtn = document.getElementById("search-btn");
    // 设置点击监听器
    searchBtn.addEventListener("click", function() {
        // 首先获取输入框的值，转为小写，为的是搜索不区分大小写
        const query = document.getElementById("article-search").value.toLowerCase();
        // 获取所有文章
        const articles = document.querySelectorAll("#articles article");
        // 转为小写
        articles.forEach(article => {
            const content = article.textContent.toLowerCase();
            // 是否包含，包含则显示，不包含则隐藏
            if (content.includes(query)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    });

    // 获显示全部按钮
    const showAllBtn = document.getElementById("show-all-btn");
    // 增加点击监听器
    showAllBtn.addEventListener("click", function() {
        // 获取所有文章
        const articles = document.querySelectorAll("#articles article");
        articles.forEach(article => {
            // 显示所有文章
            article.style.display = "block";
        });
        // 清空搜索框内容
        document.getElementById("article-search").value = "";
    });

});


