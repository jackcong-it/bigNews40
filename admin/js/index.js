
//当从登陆页面登录成功之后，跳转到index页面，那么index页面要立即发送ajax请求获取到用户的信息，将用户的名字和头像填充到页面对应的部分
//jQuery的入口函数
$(function () {
    //立刻发送ajax请求获得用户的信息
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: window.BigNew.user_info,
        // 将jQuery的ajax中设置请求头 
        //我们在后期去访问任何一个接口都需要带上token，我们每次请求接口发送ajax请求的时候都需要设置这样的headers
        // 在jQuery中设置一个方法，让这个方法在每次发送ajax的时候都调用，发送这个headers
        // 在jQuery中要找一个方法： 每次发送ajax请求的时候，都帮我们发送一个请求头
        // headers: {
        //     Authorization: window.localStorage.getItem('token')
        // },
        success: function (res) {
            // console.log(res);
            //获取到返回的用户信息，在页面渲染
            $('.user_info>img').attr('src', res.data.userPic);
            $('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
            $('.user_center_link>img').attr('src', res.data.userPic)
        }
    })


    //   退出的实现逻辑
    //    当我们点击这个退出按钮的时候，应该让这个页面回到登录页面，并且要将token删除
    // 1.获取这个按钮注册点击事件
    // 2.点击按钮删除token
    // 3.跳转回登录页面
    $('.logout').on('click', function () {
        //删除token
        window.localStorage.removeItem('token');
        //回到登录页面
        window.location.href = './login.html';
    })




    //给level01这几个div注册点击事件
    $('div.level01').on('click', function () {
        $(this).addClass('active').siblings('div').removeClass('active');

        if ($(this).index() == 1) {
            //让当前的ul如果是折叠就展开，如果是展开的就折叠
            $('ul.level02').toggle();

            //jQuery对象不能这样去触发a标签的默认的跳转事件，只有a标签的原生DOM对象才会在点击的时候触发a标签的默认的跳转行为
            $('ul.level02 li:eq(0)>a')[0].click();

            $(this).find('b').toggleClass('rotate0');
        }
    });

    //点击li标签的时候，给当前点击的li标签添加一个样式类
    $('ul.level02 li').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
})
