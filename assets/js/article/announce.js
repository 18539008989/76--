$(function() {
    let form = layui.form
        // 初始化富文本编辑器
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $.ajax({
        url: "/my/article/cates",
        success: function(res) {
            // console.log(res);
            res.data.forEach(item => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo($("#cateSelect"))
                form.render();
            })
        }
    });

    $("#file").on("change", function() {
        let file = this.files[0];
        console.log(file);
        if (file == 0) {
            return layer.msg("请选择图片");
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#chooseImg").click(function() {
        $("#file").click()
    })

    // 处理下state状态
    let state; // 文章状态(已发布，草稿)
    // 点击发布按钮
    $("#btn1").click(function() {
        state = '已发布'
    });
    // 点击草稿按钮
    $("#btn2").click(function() {
        state = '草稿'
    })
    $('#formOne').submit(function(e) {
        e.preventDefault();
        let that = this;
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(blob => { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log(blob);
                // let fd = new FormData(that);
                let fd = new FormData(this)
                    // 添加state状态 追加到 fd中收集起来
                fd.append("state", state);
                // 把文章封面 追加到 fd中收集起来
                fd.append("cover_img", blob);
                // 查看fd中收集的数据
                // fd.forEach((v, key) => {
                //     console.log(v, key);
                // });
                $.ajax({
                    type: "POST",
                    url: "/my/article/add",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layui.msg(res.message);
                        }
                        location.href = "/article/essayList.html"
                    }
                });
            })
            // 收集数据 => formdata收集表单数据(接口决定)

    });


})