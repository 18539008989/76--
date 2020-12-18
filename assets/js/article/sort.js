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
    });
    // 添加类别功能
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
                layer.msg(res.message);
                layer.close(add_id);
            }
        });

    });

    // 删除操作
    $("#alter").on("click", ".btnTwe", function() {
        let id = $(this).attr("data-id")
        layer.confirm('确认要删除？', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    fn();
                }
            });
            layer.close(index);
        });
    });
    // 编辑操作 先赋val值
    $("#alter").on("click", ".edit", function() {
        // let id = $(this).attr('data-id');
        // let name = $(this).parents("tr").children().eq(0).text();
        // let alias = $(this).parents("tr").children().eq(1).text();
        // edit_id = layer.open({
        //     type: 1,
        //     // skin: 'layui-layer-rim', //加上边框
        //     title: '修改文章类别',
        //     area: ['500px', '250px'], //宽高
        //     content: $('#addTwo').html(), // 内容，可以使用字符串，也可以使用DOM
        //     success: function() {
        //         // 弹层成功后，触发的一个函数。在这里快速为表单赋值
        //         form.val('addFormTwo', { id, name, alias });
        //     }
        // });
        // console.log(id, name, alias);




        edit_id = layer.open({
            type: 1,
            // skin: 'layui-layer-rim', //加上边框
            title: '修改文章类别',
            area: ['500px', '250px'], //宽高
            content: $('#addTwo').html(), // 内容，可以使用字符串，也可以使用DOM
        });

        let id = $(this).attr("data-id");

        $.ajax({
            url: "/my/article/cates/" + id,
            success: function(res) {
                console.log(res);
                // $("#flmc").val(res.data.name);
                // $("#flbm").val(res.data.alias);
                // $('#Id').val(res.data.Id)
                form.val("editForm", res.data)
            }
        });

    })

    // 编辑 在提交ajax信息
    $("body").on("submit", "#addFormTwo", function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
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
                layer.msg(res.message);
                layer.close(edit_id);
                fn();
            }
        });

    });
})