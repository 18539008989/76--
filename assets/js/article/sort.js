$(function() {
    let add_id = null;
    let edit_id = null;
    let layer = layui.layer;
    let form = layui.form;

    function fn() {
        $.ajax({
            url: "/my/article/cates",
            success: function(res) {
                var html = template("tpl", res)
                $("tbody").html(html)
            }
        });
    }
    fn()
    $("#append").on("click", function() {
        add_id = layer.open({
            type: 1,
            // skin: 'layui-layer-rim', //加上边框
            title: '添加文章类别',
            area: ['500px', '250px'], //宽高
            content: $('#add').html() // 内容，可以使用字符串，也可以使用DOM
        });
    })

    $("body").on("submit", "#addForm", function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: formData,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                fn()
                layer.close(add_id);
            }
        });

    });


    $("#alter").on("click", "#btnTwe", function() {
        let a = $(this).attr("data-id")
        $.ajax({
            url: "/my/article/deletecate/" + a,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                fn();
            }
        });

    });

    $("#alter").on("click", ".edit", function() {
        let id = $(this).attr('data-id');
        console.log(id);
        let name = $(this).parents("tr").children().eq(0).text();
        let alias = $(this).parents("tr").children().eq(1).text();
        edit_id = layer.open({
            type: 1,
            // skin: 'layui-layer-rim', //加上边框
            title: '修改文章类别',
            area: ['500px', '250px'], //宽高
            content: $('#addTwo').html(), // 内容，可以使用字符串，也可以使用DOM
            success: function() {
                // 弹层成功后，触发的一个函数。在这里快速为表单赋值
                form.val('addFormTwo', { id, name, alias });
            }
        });
        console.log(id, name, alias);
    })
    $("body").on("submit", "#addFormTwo", function(e) {
        fn();
        e.preventDefault();
        let formData = $(this).serializeArray();
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: formData,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                location.reload();
                layer.msg(res.message);
            }
        });

    });
})