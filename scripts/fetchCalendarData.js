const appId = "44638";
const appSecret = "fa6b6e6bc00a486abbfe1097d4b224ef";

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var currentDate = new Date();
var queryDate = currentDate.Format("yyyyMMdd");
var todayDate = currentDate.getDate();

var requestUrlString = "https://route.showapi.com/856-1?date="
    + queryDate
    + "&showapi_appid="
    + appId
    + "&showapi_sign="
    + appSecret;

fetch(requestUrlString)
    .then(function (response) {
        console.log(response.status)
        response.json().then(function (data) {
            console.log(data)
            data = JSON.stringify(data)
            var basicJsonObject = JSON.parse(data)
            var showapiResponseBody = basicJsonObject.showapi_res_body;

            document.getElementById("currentGregorianYearMonth").innerHTML = showapiResponseBody.gongli;//公历年月
            document.getElementById("currentGregorianDate").innerHTML = todayDate;//公历日期
            document.getElementById("currentLunarDate").innerHTML = showapiResponseBody.nongli;//农历日期

            document.getElementById("shengxiao").innerHTML = showapiResponseBody.shengxiao;//生肖
            document.getElementById("ganzhi").innerHTML = showapiResponseBody.ganzhi;//干支

            //document.getElementById("chongsha").innerHTML = showapiResponseBody.chongsha;//冲煞
            //document.getElementById("xingzuo").innerHTML = showapiResponseBody.xingzuo;//星座

            document.getElementById("currentDayYi").innerHTML = showapiResponseBody.yi;//冲煞
            document.getElementById("currentDayJi").innerHTML = showapiResponseBody.ji;//星座
        })
    })

