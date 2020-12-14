// ajax的配置  => 优化跟路径 => $.ajaxPrefilter()
$.ajaxPrefilter(function(e) {
    e.url = "http://ajax.frontend.itheima.net" + e.url;
})