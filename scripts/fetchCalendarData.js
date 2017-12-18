const appId = "44638";
const appSecret = "fa6b6e6bc00a486abbfe1097d4b224ef";
var queryDate = "20171215";

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

            document.getElementById("gongli").innerHTML = showapiResponseBody.gongli;//公历
            document.getElementById("nongli").innerHTML = showapiResponseBody.nongli;//农历
            document.getElementById("jieqi24").innerHTML = showapiResponseBody.jieqi24;//节气
            document.getElementById("shengxiao").innerHTML = showapiResponseBody.shengxiao;//生肖
            document.getElementById("xingzuo").innerHTML = showapiResponseBody.xingzuo;//星座
        })
    })