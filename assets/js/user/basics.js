$(function() {
    let form = layui.form;
    let layer = layui.layer;

    function fn() {
        $.ajax({
            url: "/my/userinfo",
            success: function(res) {
                // $("#dlm").val(res.data.username);
                // $("#hide").val(res.data.id)
                console.log(res);
                form.val('form', res.data)
            }
        });
    }
    fn();
    $("form").on("submit", function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: formData,
            success: function(res) {
                if (res.ststus == !0) {
                    return layer.msg("修改用户信息失败");
                }
                layer.msg('修改成功');
                console.log(res);
                // window.parent.location.reload();
                window.parent.getUserInfo()

            }
        });
    });

    $("form").on("click", '#btn', function(e) {
        // e.preventDefault();
        fn();
        return false;
    })
})