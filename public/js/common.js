let userInfo = localStorage.getItem('userInfo');
userInfo = userInfo ? JSON.parse(userInfo) : null;

if (!userInfo) {
    location.href = '/login.html';
} else {
    $('#userIcon').attr('src', userInfo.icon);
    $('#admin').html(userInfo.username);
}


function subIcon() {
    
    var formData = new FormData();
    formData.append('icon', $("#inp-icon")[0].files[0]);
    console.log($("#inp-icon")[0].files);
    
    var _token = localStorage.getItem('token')
    $.ajax({
        type: "POST",
        url: "http://localhost:4444/api/user/upload",
        headers: {
            'access_token': _token
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                $('#userIcon').attr('src', res.data.icon);
                // 更新本地存储
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                userInfo.icon = res.data.icon;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

            } else {
                alert(res.msg);     
            }
            layer.closeAll();
        }
    });
}

// 点击修改按钮进行修改
$("#change").click(function () {
    layer.open({
        type: 1,
        title: '修改头像',
        content: `<input type="file" name="icon" id="inp-icon"><br>
        <button class="layui-btn layui-btn-sm layui-btn-danger" onclick="subIcon()" id= "subIcon">提交</button>`,
        area: ['350px', '200px']
    });
})

// $("#subIcon").click(function () {

// })