$(function() {
    let layer = layui.layer;
    let form = layui.form
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        oldpass: function(value) {
            let oldPwd = $("[name=oldPwd]").val();
            if (value === oldPwd) {
                return "密码不能相同"
            }
        },
        newpass: value => {
            let newPwd = $("[name=newPwd]").val();
            if (newPwd !== value) {
                return "两次输入密码不相同"
            }
        }
    });
    $("form").submit(function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: formData,
            success: function(res) {
                console.log(res);
                if (res.status == !0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                location.reload();
            }
        });
    });
})