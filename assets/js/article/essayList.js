$(function() {
    // pagenum	是	int	页码值
    // pagesize	是	int	每页显示多少条数据
    // cate_id	否	string	文章分类的 Id
    // state    否	string	文章的状态，可选值有：已发布、草稿
    let form = layui.form
    let laypage = layui.laypage
    let layer = layui.layer
    let query = {
        pagenum: 1, //是 int 页码值  默认请求第一页数据
        pagesize: 2, //  是 int 每页显示多少条数据  默认加载两条数据
        cate_id: "", // 默认加载所以分类
        state: "", // 文章的状态，可选值有：已发布，草稿 默认加载所有状态
    }

    fn();

    function fn() {
        $.ajax({
            url: "/my/article/list",
            data: query,
            success: function(res) {
                // console.log(res);
                let html = template("tpl", res)
                $("tbody").html(html)
                    // 分页渲染
                renderPage(res.total)
            }
        });
    }


    template.defaults.imports.dataFormat = function(data) {
        const date = new Date(data);
        let y = date.getFullYear();
        let m = (date.getMonth() + 1).toString().padStart(2, 0);
        let d = date.getDate().toString().padStart(2, 0);

        let hh = date.getHours().toString().padStart(2, 0);
        let mm = date.getMinutes().toString().padStart(2, 0);
        let ss = date.getSeconds().toString().padStart(2, 0);
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    };


    // 分页
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            limit: query.pagesize, // 每页显示的条数
            count: total, //数据总数，从服务端得到
            curr: query.pagenum, // 起始页
            limits: [2, 3, 5, 10, 15], // 每页显示的条数
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                query.pagesize = obj.limit
                query.pagenum = obj.curr;
                // fn();


                // 首次不执行  => 解决分页的bug
                if (!first) {
                    //do something
                    fn();
                }
            }

        });
    }


    // 发送ajax 获取类别数据

    $.ajax({
        url: "/my/article/cates",
        success: function(res) {
            // console.log(res);
            res.data.forEach(item => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo($("#cateSelect"));
                //  如果以上操作没有生成 ，那么就重新渲染以下
                form.render();
            })
        }
    });

    // 实现筛选功能 
    // 1. 监听form的submit提交筛选的功能
    // 2. 获取到需要的分类以及状态，修改下query对象的参数
    // 3. 重新获取下文章列表(按照query对象)
    $("#form").on("submit", function(e) {
        e.preventDefault();
        query.cate_id = $("#cateSelect").val();
        query.state = $("#cate").val();
        fn();
        console.log(query);
    });

    $("#tb").on("click", ".btnTwe", function() {
        // 对于删除文章的时候会有bug 当把一夜中所以的数据全部删除之后，需要让其加载pagenum - 1的数据
        // 另外：pagenum 没有第0页 最下值为1

        // 难点：把这一页中的所有的数据全部删除 => 根据页面中的删除按钮的个数
        if ($('.btnTwe').length === 1) {
            if (query.pagenum === 1) {
                query.pagenum = 1;
            } else {
                query.pagenum = query.pagenum - 1;
            }
        }
        layer.confirm('确认要删除？', { icon: 3, title: '提示' }, function(index) {
            let id = $(this).attr('data-id');
            $.ajax({
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }

                    layer.msg(res.message);
                    fn();
                }
            });
        });
    })

    $('#tb').on("click", '.edit', function() {
        location.href = '/article/redact.html?id=' + $(this).attr('data-id')

    })
})