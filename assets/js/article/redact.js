$(function() {
    let form = layui.form;
    // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    window.onload = function() {
        var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
        var id = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                id[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
            console.log("参数", id); //此时的theRequest就是我们需要的参数；

        }

    }

    window.onload = function() {
        var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
        var id = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                id[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
            console.log("参数", id); //此时的theRequest就是我们需要的参数；

        }
        $.ajax({
            url: "/my/article/cates",
            success: function(res) {
                console.log(res);
                res.data.forEach(item => {
                    $(`<option name="${item.Id}"  value="${item.Id}">${item.name}</option>`).appendTo($("#cateSelectOne"))
                    form.render();
                })
            }
        });
        $.ajax({
            url: "/my/article/" + id.id,
            success: function(res) {
                let data = res.data;
                console.log(data);
                $("#title").val(data.title);
            }
        });
    }
})