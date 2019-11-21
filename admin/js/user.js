
$(function () {
    // 当用户点击跳转到用户页面的时候，就应该将用户的信息获取，填充到表单中
    $.get({
        url: BigNew.user_detail,
        success: function (res) {
            // console.log(res);
            // 当数据获取成功，渲染在页面上
            if (res.code == 200) {
                // $('input.username').val(res.data.username);
                // $('input.nickname').val(res.data.nickname);
                // $('input.email').val(res.data.email);
                // $('input.password').val(res.data.password);
                //因为数据中的字段名和表单中的每个表单元素的类名是相同的，所以我们可以这么处理
                for (var key in res.data) {
                    // console.log(key);
                    // console.log(key+'------'+res.data[key]);
                    $('input.' + key).val(res.data[key]);
                }

                $('.user_pic').attr('src', res.data.userPic);
            }
        }
    })

    //给文件域按钮注册一个change事件，当选择好图片之后，在页面显示预览效果
    $('#exampleInputFile').on('change', function () {
        // console.log(this.files[0];
        //将选择的图片转换成一个url地址
        var imgIcon = this.files[0];
        //window上右一个URL对象，在这个对象中有一个createObjectURL，将图片的信息转换为url地址
        var url = URL.createObjectURL(imgIcon);
        // console.log(url);
        //将这个地址设置给img的src属性
        $('.user_pic').attr('src', url);
    })

    // 给修改的按钮注册点击事件
    $('button.btn-edit').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();
        //获取表单信息
        // 获取form表单 formData只能处理原生的DOM对象
        var form = $('#form')[0];
        var userData = new FormData(form);
        //发送ajax请求提交数据
        $.post({
            url: BigNew.user_edit,
            data: userData,
            //不需要设置请求类型
            contentType: false,
            //不需要进行编码
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    //刷新子页面
                    // window.location.reload();
                    //在子页面中刷新父页面
                    // parent.window.location.reload();

                    $.ajax({
                        type: 'get',
                        url: window.BigNew.user_info,
                        success: function (res) {
                            //获取到返回的用户信息，在页面渲染
                            // parent在子页面获取到父页面的元素
                            parent.$('.user_info>img').attr('src', res.data.userPic);
                            parent.$('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                            parent.$('.user_center_link>img').attr('src', res.data.userPic)

                            //刷新子页面
                            window.location.reload();
                        }
                    })
                }
            }
        })
    })

})
