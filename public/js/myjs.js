/**
 * 学生查询  并且显示在表格当中
 */
var student = {
    data: {
        list: [], //数据列表
        totalPage: 1, //总页数
        pageNum: 1, //当前页数
        pageSize: 5, //每页显示的数量
        stuname: '' //搜索的名字
    },
    showStudent: function () {
            $.ajax({
                type: "get",
                url: "http://localhost:4444/api/stu",
                data: {
                    pageNum: student.data.pageNum,
                    pageSize: student.data.pageSize,
                    stuname: student.data.stuname
                },
                headers: {
                    'access_token': localStorage.getItem('token')
                },
                success: function (res) {
                    if (res.code === 0) {
                        student.data.list = res.data.list;
                        student.data.totalPage = res.data.totalPage;
                        // ejs模板引擎  表格内容

                        let html = ejs.render($("#tab-stu").html(), {
                            list: student.data.list
                        });

                        // 页码
                        let numhtml = ejs.render($("#page-btn").html(), {
                            totalPage: student.data.totalPage,
                            pageNum: student.data.pageNum
                        })

                        $("#my-tbody").html(html);
                        $("#page-box").html(numhtml);
                    } else {
                        layer.msg('网络出错，请刷新重试');
                    }
                }
            });
        }


        ,
    // showStudent: function () {
    //     $.get('http://localhost:4444/api/stu', {
    //         pageNum: student.data.pageNum,
    //         pageSize: student.data.pageSize,
    //         stuname: student.data.stuname
    //     }, function (res) {
    //         if (res.code === 0) {
    //             student.data.list = res.data.list;
    //             student.data.totalPage = res.data.totalPage;
    //             // ejs模板引擎  表格内容

    //             let html = ejs.render($("#tab-stu").html(), {
    //                 list: student.data.list
    //             });

    //             // 页码
    //             let numhtml = ejs.render($("#page-btn").html(), {
    //                 totalPage: student.data.totalPage,
    //                 pageNum: student.data.pageNum
    //             })

    //             $("#my-tbody").html(html);
    //             $("#page-box").html(numhtml);
    //         } else {
    //             layer.msg('网络出错，请刷新重试');
    //         }
    //     })
    // },
    addOne: function () {
        let stuname = $("#stuname").val();
        student.addStu(stuname);
    },
    // addStu: function (stuname) {
    //     $.post("http://localhost:4444/api/stu", {
    //         stuname: stuname
    //     }, function (res) {
    //         console.log(res);

    //         if (res.code === 0) {
    //             layer.closeAll();
    //             layer.msg(stuname + '添加成功');
    //         } else {
    //             layer.msg(res.msg);
    //         }
    //     });
    // },
    addStu: function (stuname) {
        $.ajax({
            type: "POST",
            url: "http://localhost:4444/api/stu",
            data: {
                stuname: stuname
            },
            headers: {
                "access_token": localStorage.getItem('token')
            },
            success: function (res) {
                if (res.code === 0) {
                    layer.closeAll();
                    layer.msg(stuname + '添加成功');
                } else {
                    layer.msg(res.msg);
                }
            }
        });
    },
    delStu: function (name) {
        $.ajax({
            type: "delete",
            url: "http://localhost:4444/api/stu",
            data: {
                stuname: name
            },
            success: function (res) {
                if (res.code === 0) {
                    layer.msg('删除成功');
                } else {
                    layer.msg('删除失败');
                }
            }
        });
    },
    // 页码的事件委托
    onBtn: function () {
        $('#page-box').on('click', 'button', function () {
            // 获取点击的页数是哪一页
            let toPage = $(this).data('num');
            // 判断点击的是否就是当前页
            if (toPage !== student.data.pageNum) {
                // 设置当前页
                student.data.pageNum = toPage;

                // 发送请求
                student.showStudent();
            }
        })
        // 添加
        $("#addstu").click(function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: `<div class="layui-form-item" id="layer_box">
                <label class="layui-form-label">学生姓名</label>
                <div class="layui-input-block">
                    <input type="text" name="stuname" id="stuname" required lay-verify="required" placeholder="请输入学生姓名" autocomplete="off"
                        class="layui-input">
                        <button class="layui-btn id="addOne" layui-btn-warm" onclick = "student.addOne()">添加</button>
                </div>
            </div>`,
                title: '添加学生'
            });
        })
        // 搜索功能
        $("#sub").click(function () {
            let value = $('#search').val();
            student.data.stuname = value;
            student.data.pageNum = 1;
            student.showStudent();
        })

        // 删除学生
        $('#my-tbody').on('click', '.del', function () {
            let stuname = $(this).parents('tr').children('.name').html();
            console.log(stuname);

        })

    }
}
// 管理员
var admin = {
    out: function () {
        $("#outlogin").click(function () {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            location.reload();
        })
    },
    change: function () {

    }
}

// 主函数
$(function () {
    student.showStudent();
    student.onBtn();
    admin.out();
})