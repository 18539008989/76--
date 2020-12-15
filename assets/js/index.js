// 发送ajax请求来获取到用户的基本信息(头像,nicheng)
let layer = layui.layer;

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",

        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败");
            }
            let name = res.data.nickname || res.data.username;
            $("#weLcome").text(name);

            if (res.data.user_pic) {
                $(".layui-nav-img").show();
                $(".textAcatar").hide();
            } else {
                $(".textAcatar").text(name[0].toUpperCase()).show();
                $(".layui-nav-img").hide();
            }
        },
        complete: function(res) {
            console.log(res);
            let a = res.responseJSON;
            if (a.status === 1 && a.message === "身份认证失败！") {
                location.href = "/home/login.html"
                localStorage.removeItem("token");
            }
        }

    });
}
getUserInfo();


$("#logoBtn").on("click", function() {

    layer.confirm('确定要退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem("token");
        location.href = "/home/login.html";
        layer.close(layer.index);
    });
})