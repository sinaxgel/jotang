// 导航栏的固定与变色    
    window.addEventListener('scroll', function() {
        var navbar = document.querySelector('.daohanglan');
        var icons = document.querySelectorAll('.icon');  
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
            icons.forEach(function(icon) {
                icon.classList.add('scrolled-icon');  // 为每个图标添加scrolled-icon类
            });
        } else {
            navbar.classList.remove('scrolled');
            icons.forEach(function(icon) {
                icon.classList.remove('scrolled-icon');  // 为每个图标移除scrolled-icon类
            });
        }
    });
    
    // part1 轮播图
    document.addEventListener("DOMContentLoaded", function() {
        // 设置一个索引用于追踪当前图片
        let currentIndex = 0;
        // 获取相关的元素
        const slides = document.querySelectorAll(".lunbo1 img");
        const zhishidian = document.querySelectorAll(".dian");
        const prevBtn = document.querySelector(".btn-left");
        const nextBtn = document.querySelector(".btn-right");
    // 该函数实现显示与隐藏图片，显示索引的图片，同时改变对应的指示点的样式
        function showSlide(index) {
            slides[currentIndex].style.display = "none";
            zhishidian[currentIndex].classList.remove("active");
            
            // 实现循环
            currentIndex = (index + slides.length) % slides.length;  
    
            slides[currentIndex].style.display = "block";
            zhishidian[currentIndex].classList.add("active");
        }
    // 利用函数实现每隔3秒自动切换
        let autoSlideInterval = setInterval(function() {
            showSlide(currentIndex + 1);
        }, 3000);
    
        // 定义一个函数重置计时，不然我们手动切换会影响自动切换
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(function() {
                showSlide(currentIndex + 1);
            }, 3000);
        }
    // 左按钮
        prevBtn.addEventListener("click", function() {
            showSlide(currentIndex - 1);
            resetAutoSlide();
        });
    // 右按钮
        nextBtn.addEventListener("click", function() {
            showSlide(currentIndex + 1);
            resetAutoSlide();
        });
    // 用指示点切换
        zhishidian.forEach(function(dian, index) {
            dian.addEventListener("click", function() {
                showSlide(index);
                resetAutoSlide();
            });
        });
    // 默认显示第一张
        showSlide(0);
    });
    
// part2 自动播放
let video = document.getElementById('myVideo');
let fengmian = document.getElementById('fengmian');

fengmian.addEventListener('mouseenter', function() {
    // 隐藏封面图像
    fengmian.style.display = 'none'; 
    jieshao.style.display = 'none';
     // 显示视频
    video.style.display = 'block';
    // 开始播放
    video.play();
});

video.addEventListener('mouseleave', function() {
    // 停止并清0
    video.pause();
    video.currentTime = 0; 
    // 显示封面图像
    fengmian.style.display = 'block'; 
    jieshao.style.display = 'block';
    // 隐藏视频
    video.style.display = 'none'; 
});


// part3 拓展内容
    let manhua = document.getElementsByClassName("manhua")[0];
    var manhua12 = document.getElementsByClassName("manhua12")[0];
    manhua.onmousemove = function () {


        manhua12.style.display = 'block';


    }
    manhua.onmouseout = function () {

        manhua12.style.display = 'none';
    }


    let xiake = document.getElementsByClassName("xiake")[0];
    var xiake12 = document.getElementsByClassName("xiake12")[0];
    xiake.onmousemove = function () {


        xiake12.style.display = 'block';


    }
    xiake.onmouseout = function () {

        xiake12.style.display = 'none';
    }



    let tuozhan11 = document.getElementsByClassName("tuozhan11")[0];
    var tuozhan1 = document.getElementsByClassName("tuozhan1")[0];
    tuozhan11.onmousemove = function () {


        tuozhan1.style.display = 'block';


    }
    tuozhan11.onmouseout = function () {

        tuozhan1.style.display = 'none';
    }


    let tuozhan22 = document.getElementsByClassName("tuozhan22")[0];
    var tuozhan2 = document.getElementsByClassName("tuozhan2")[0];
    tuozhan22.onmousemove = function () {


        tuozhan2.style.display = 'block';


    }
    tuozhan22.onmouseout = function () {

        tuozhan2.style.display = 'none';
    }

    let tuozhan33 = document.getElementsByClassName("tuozhan33")[0];
    var tuozhan3 = document.getElementsByClassName("tuozhan3")[0];
    tuozhan33.onmousemove = function () {


        tuozhan3.style.display = 'block';


    }
    tuozhan33.onmouseout = function () {

        tuozhan3.style.display = 'none';
    }

    let tuozhan44 = document.getElementsByClassName("tuozhan44")[0];
    var tuozhan4 = document.getElementsByClassName("tuozhan4")[0];
    tuozhan44.onmousemove = function () {


        tuozhan4.style.display = 'block';


    }
    tuozhan44.onmouseout = function () {

        tuozhan4.style.display = 'none';
    }

    let tuozhan55 = document.getElementsByClassName("tuozhan55")[0];
    var tuozhan5 = document.getElementsByClassName("tuozhan5")[0];
    tuozhan55.onmousemove = function () {


        tuozhan5.style.display = 'block';


    }
    tuozhan55.onmouseout = function () {

        tuozhan5.style.display = 'none';
    }

    let tuozhan66 = document.getElementsByClassName("tuozhan66")[0];
    var tuozhan6 = document.getElementsByClassName("tuozhan6")[0];
    tuozhan66.onmousemove = function () {


        tuozhan6.style.display = 'block';


    }
    tuozhan66.onmouseout = function () {

        tuozhan6.style.display = 'none';
    }

    let tuozhan77 = document.getElementsByClassName("tuozhan77")[0];
    var tuozhan7 = document.getElementsByClassName("tuozhan7")[0];
    tuozhan77.onmousemove = function () {


        tuozhan7.style.display = 'block';


    }
    tuozhan77.onmouseout = function () {

        tuozhan7.style.display = 'none';
    }



    let tuozhan88 = document.getElementsByClassName("tuozhan88")[0];
    var tuozhan8 = document.getElementsByClassName("tuozhan8")[0];
    tuozhan88.onmousemove = function () {


        tuozhan8.style.display = 'block';


    }
    tuozhan88.onmouseout = function () {

        tuozhan8.style.display = 'none';
    }

    let tuozhan99 = document.getElementsByClassName("tuozhan99")[0];
    var tuozhan9 = document.getElementsByClassName("tuozhan9")[0];
    tuozhan99.onmousemove = function () {


        tuozhan9.style.display = 'block';


    }
    tuozhan99.onmouseout = function () {

        tuozhan9.style.display = 'none';
    }



    let tuozhan1010 = document.getElementsByClassName("tuozhan1010")[0];
    var tuozhan10 = document.getElementsByClassName("tuozhan10")[0];
    tuozhan1010.onmousemove = function () {


        tuozhan10.style.display = 'block';


    }
    tuozhan1010.onmouseout = function () {

        tuozhan10.style.display = 'none';
    }
