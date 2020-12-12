$(function() {
    // 注册账号
    $("#goToRegi").click(function() {
        // 显示注册 
        $(".register").show();
        // 隐藏登录
        $(".login").hide();
    });

    // 登录
    $("#goToLogin").click(function() {
        // 显示注册 
        $(".register").hide();
        // 隐藏登录
        $(".login").show();
    });
    // 从layui中回去form表单相关的功能 => 注意一定要如此操作，否则直接使用form会报错
    let form = layui.form;
    let layer = layui.layer;
    // 自定义校验规则
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // repass 两次输入的密码确认一致
        repass: function(value, item) {
            //value：表单的值、item：表单的DOM对象
            console.log(value);

            let val = $(".passIpt").val();
            console.log(val);
            // 通过value 和 密码框的值做比较，如果不一致，弹框提示
            if (value != val) {
                return "两次输入的密码不一致"
            }


        }
    });
    // 实现注册功能
    // 1.当form表单提交的时候，触发表单的submit提交功能 => 注册form的submit事件
    // 2.阻止form表单的默认行为
    // 3.收集表单中数据(用户名，密码) => jQ的serialize() 带有name 的值
    // 4.发送ajax  => 照着接口文档

    // 1.
    $("#regiForm").submit(function(e) {

        // 2.
        e.preventDefault();

        // 3.
        let data = $(this).serialize();
        // 4. 
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 清空注册的form表单
                $("#regiForm")[0].reset();

                // 去登录 => 触发其点击功能
                $("#goToLogin").click();
            }
        });

    });


    $("#loginForm").submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/login",
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('登录成功', {
                        time: 2000,
                    },
                    function() {
                        location.href = "/home/index.html"
                    });
            }

        });

    })
})