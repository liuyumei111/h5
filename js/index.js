$(function () {
    $('#dowebok').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
        continuousVertical: true
    });

    //省份数组
    var shengArr = [
        "请选择省份",
        "北京",
        "天津",
        "浙江",
        "黑龙江",
        "吉林",
        "江苏",
        "山东",
        "山西",
        "宁夏",
        "四川",
        "陕西",
        "重庆",
        "河南",
        "湖南",
        "湖北",
        "安徽",
        "广东",
        "云南",
        "江西",
        "贵州",
        "上海",
        "福建",
        "青海",
        "河北",
        "甘肃",
        "内蒙古",
        "辽宁",
    ];

    var shengStr = '';
    var shiStr = '';
    var nameStr = '';

    //渲染所有省
    shengArr.forEach(function (item) {
        shengStr += '<option value=' + item + '>' + item + '</option>'
    });
    $('.sheng').html(shengStr);

    //根据省渲染市
    $("#sheng").change(function () {
        var shengOpt = $("#sheng").val();
        // console.log(shengOpt)
        if (shengOpt == '选择省份') {
            return
        } else {
            shiArr = [];
            shiStr = '<option value=请选择城市>请选择城市</option>';
            shiFun(shengOpt);
            // console.log(shiArr);
            //根据省渲染市
            shiArr.forEach(function (item) {
                shiStr += '<option value=' + item + '>' + item + '</option>'
            });
            $('.shi').html(shiStr);
            // console.log(shiStr)
        }
    });

    // 根据市渲染经销店
    $('#shi').change(function () {
        var shiOpt = $("#shi").val();
        // console.log(shiOpt)
        if (shiOpt == '请选择城市') {
            return
        } else {
            nameArr = [];
            nameStr = '<option value=请选择经销店>请选择经销店</option>';
            nameFun(shiOpt);
            // console.log(nameArr)
            // 根据市渲染经销店
            nameArr.forEach(function (item) {
                nameStr += '<option value=' + item + '>' + item + '</option>'
            })
            $('.dian').html(nameStr);

        }
    });

//    城市市数组
    var shiArr = [];

    function shiFun(value) {
        arr.forEach(function (item) {
            if (item.pro == value) {
                shiArr.push(item.city);
            }
        });
    }

//    经销店数组
    var nameArr = [];

    function nameFun(value) {
        arr.forEach(function (item) {
            if (item.city == value) {
                nameArr.push(item.name);
            }
        });

    }

    $('input').checked = false;
    //查看个人信息保护声明
    $('.statement').click(function () {
        layer.msg('我特此授权红旗，需按照数据保护规定，保留我的信息数据，以便解答我的问题。我同意红旗把我的数据用于其他营销调查和统计目的，并允许红旗根据我提供的信息与我联系');
    });
//    接口对接
    var url = 'http://api.dmp.iwoqiche.com/official/cueCollection';
    $('.slider2-btn').click(function () {
        var name = $('.name').val();
        var sex = $('.sex').val();
        var tpl = $('.tpl').val();
        var cars = $('.cars').val();
        var sheng = $('#sheng').val();
        var shi = $('#shi').val();
        var dian = $('.dian').val();
        //手机号正则
        var regTel = /^[1][3,4,5,7,8][0-9]{9}$/;


        if (name == 'NaN' || name == 'undefined' || name == '' || name == 'volvo') {
            layer.tips('姓名不能为空', '.name', {tips: [1, '#000']});
            return false;
        }
        if (sex == 'NaN' || sex == 'undefined' || sex == '' || sex == 'volvo') {
            layer.tips('性别不能为空', '.sex', {tips: [1, '#000']});
            return false;
        }
        if (tpl == 'NaN' || tpl == 'undefined' || tpl == '' || tpl == 'volvo') {
            layer.tips('电话不能为空', '.tpl', {tips: [1, '#000']});
            return false;
        } else if (!regTel.test(tpl)) {
            layer.tips('手机号格式错误', '.tpl', {tips: [1, '#000']});
            return false
        }
        if (cars == 'NaN' || cars == 'undefined' || cars == '' || cars == 'volvo') {
            layer.tips('意向车型不能为空', '.cars', {tips: [1, '#000']});
            return false;
        }
        if (sheng == 'NaN' || sheng == 'undefined' || sheng == '' || sheng == 'volvo' || sheng == '请选择省份') {
            layer.tips('请选择省份', '#sheng', {tips: [1, '#000']});
            return false;
        }
        if (shi == 'NaN' || shi == 'undefined' || shi == '' || shi == 'volvo' || shi == '请选择城市') {
            layer.tips('请选择城市', '#shi', {tips: [1, '#000']});
            return false;
        }
        if (dian == 'NaN' || dian == 'undefined' || dian == '' || dian == 'volvo' || dian == '请选择经销店') {
            layer.tips('请选择经销店', '.dian', {tips: [1, '#000']});
            return false;
        }


        //经销商店对应tds代码并重新赋值
        arr.forEach(function (value) {
            if (dian == value.name) {
                dian = value.tds
            }
        });

        //判断是否同意个人信息保护声明
        if ($('input').is(':checked') == false) {
            layer.msg('未勾选同意明');
            return false
        }

        var data = {
            parent_num: 'W3G1HS5P2X04H00O4KW758L5F7',//父媒体编号--固定
            child_num: '88Z15Y34W41P14D581',//子媒体编号--固定
            phone: tpl,//手机号
            shop_id: dian,//经销商id
            equipment: 2,//用户浏览终端--手机
            clue_type: 101,//线索类型--试驾
            sex: sex,//顾客性别
            username: name,//用户称呼
            intention: cars,//意向车系
            province: sheng,//省份
            city: shi,//城市
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 0 && data.msg == '请求成功') {
                    layer.msg('提交成功');
                }
            },
        });
    })

    //轮播图
    swiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    swiper2 = new Swiper('.swiper-container2', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

//    选项卡
    $('.slider4-choice').find('.choice-title-span').click(function () {
        $('.slider4-choice').find('ul').css('display', 'none');
        $(this).attr('class', 'choice-title-active').siblings().removeClass('choice-title-active');
        console.log($(this).attr('class', 'choice-title-active').siblings());
        $('.slider4-choice').find('ul').eq($(this).index()).css('display', 'block');
    })

});