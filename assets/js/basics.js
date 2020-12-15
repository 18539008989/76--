$(function() {
    $.ajax({
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function(res) {
            $("#dlm").val(res.data.username);
            $("#hide").val(res.data.id)
            console.log(res);
        }
    });
    $("form").on("submit", function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: formData,
            headers: {
                Authorization: localStorage.getItem("token")
            },
            success: function(res) {
                console.log(res);
                window.parent.getUserInfo();
            }
        });
    });
})