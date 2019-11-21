
//使用jQuery来处理,先设置好入口函数
$(function () {
    //  登录的逻辑
    // 1.先获取登录按钮，给登录按钮注册点击事件
    $('.input_sub').on('click', function (e) {
        //这个按钮是一个submit按钮，会默认跳转，我们需要阻止其默认行为
        e.preventDefault();
        // 2.点击的时候获取用户名和密码  我们要去除用户名和密码前后的空格
        var userName = $('.input_txt').val().trim();
        var userPwd = $('.input_pass').val().trim();
        // 3.非空判断
        if (userName == '' || userPwd == '') {
            // alert('亲，请输入用户名或者密码');
            $('.modal-body').text('亲，用户名和密码不能为空哦');
            $('#myModal').modal();
            return;
        }
        // 4.使用ajax请求数据，做页面渲染
        $.ajax({
            type: 'post',
            // url: 'http://localhost:8080/api/v1/admin/user/login',
            url: window.BigNew.user_login,
            data: {
                username: userName,
                password: userPwd
            },
            success: function (res) {
                $('.modal-body').text(res.msg);
                $('#myModal').modal();
                // console.log(res);
                //判断用户名或者密码是否正确
                if (res.code == 200) {
                    // 当我们登录成功之后，我们需要将token令牌存储到本地，然后在使用其他的页面的时候，将这个令牌拿出来给别人看，这个令牌就是用来鉴别我们是否有登录
                    window.localStorage.setItem('token', res.token);
                    // alert('欢迎回家，亲');
                    //跳转的网站的首页
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        window.location.href = './index.html';
                    })

                }
                // else {
                //   // alert('你个SB，用户名和密码都记不住');
                //   $('.modal-body').text(res.msg);
                //   $('#myModal').modal();
                // }
            }
        })
    })

})

