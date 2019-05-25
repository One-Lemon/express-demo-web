$(function () {
    $("#login").click(function () {
        let name = $("#name").val();
        let password = $("#password").val();
        $.post("http://localhost:4444/api/login", {
            username: name,
            password: password
        }, function (res) {
            console.log(res);

            if (res.code === 0) {
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                localStorage.setItem('token', res.data.token);
                location.href = '/';
            } else {
                layer.msg(res.msg);
            }
        });
    });
})