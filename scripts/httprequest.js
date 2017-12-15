function CallBack() {
    this.start = null;
    this.next = null;
    this.complete = null;
    this.error = null;
}

CallBack.prototype = {
    constructor: CallBack,

    Start: function (start) {
        this.start = start;
        return this;
    },

    Next: function (next) {
        this.next = next;
        return this;
    },

    Complete: function (complete) {
        this.complete = complete;
        return this;
    },

    Error: function (error) {
        this.error = error;
        return this;
    },

    onStart: function () {
        if (this.start != null) {
            this.start;
        }
    },

    onNext: function (data) {
        if (this.next != null) this.next(data);
    },

    onComplete: function () {
        if (this.complete != null) this.complete();
    },

    onError: function (code, method, url) {
        if (this.error != null) this.error(code, method, url);
    }


};

function ShttpDefine() {
    this.callback = null;
    this.url = null;
    this.method = null;
    this.params = {};
    this.headers = {};
}

ShttpDefine.prototype = {
    constructor: ShttpDefine,
    Url: function (url) {
        this.url = url;
        return this;
    },

    Method: function (method) {
        this.method = method;
        return this;
    },

    addParams: function (params) {
        if (params == null) {
            this.params = params;
        } else {
            this.params = mergeJsonObject(this.params, params);
        }
        return this;
    },

    addHeaders: function (headers) {
        if (headers == null) {
            this.headers = headers;
        } else {
            this.headers = mergeJsonObject(this.headers, headers);
        }
        return this;
    },

    execute: function (callback) {
        this.callback = callback;
        SHttp.request(this.url, this.method, this.params, this.data, this.callback);
    }

};

var HttpDefaultConfig = {
    /**请求头配置*/
    headers: {
        // 'Accept': 'application/json',
        //'User-Agent': 'app',
        'X-Requested-With': 'XMLHttpRequest',
        //'Content-Type': 'application/x-www-form-urlencoded',
        'channelToken': 'xxxxxxxxxx',
        //'debug': true
    },
    /*其他配置*/
    async: true,
    timeout: 3000,
    /*以下配置貌似没啥用，因为请求头里面可以完成这些配置*/
    dataType: "text",
    contentType: "text/plain; charset=UTF-8",
    jsonp: "callback"    // for query string
}

var SHttp = {
    /***
     * 相当于全局配置
     * */
    defaultConfig: HttpDefaultConfig,//默认配置

    /**
     * 可能有点类似内部类的写法，主要是实现build的设置方式
     * */
    newInstance: function () {
        var shttpDefine = new ShttpDefine();
        //shttpDefine.addHeaders(httpDefaultConfig.headers);//设置默认头部
        return shttpDefine;
    },

    /**
     * 网络请求的实现类，里面实现网络请求，不管用Ajax/Fetch等
     * */
    request: function (url, method, params, headers, simpleCallBack) {
        simpleCallBack.onStart();
        httpx.request({
            headers: mergeJsonObject(headers, this.defaultConfig.headers),
            async: this.defaultConfig.async,
            timeout: this.defaultConfig.timeout,
            //dataType: this.defaultConfig.dataType,
            //contentType: this.defaultConfig.contentType,
            //jsonp: this.defaultConfig.jsonp,    // for query string

            method: method,
            url: url,
            data: params,

            success: function (data) {
                simpleCallBack.onNext(data);
                simpleCallBack.onComplete();
            },
            error: function (method, url) {
                simpleCallBack.onError(-1, method, url);
            },
            ontimeout: function (method, url) {
                simpleCallBack.onError(-2, method, url);
            }
        });
    }
}

mergeJsonObject = function (jsonObject1, jsonObject2) {
    var resultJsonObject = {};
    for (var attr in jsonObject1) {
        resultJsonObject[attr] = jsonObject1[attr];
    }
    for (var attr in jsonObject2) {
        resultJsonObject[attr] = jsonObject2[attr];
    }
    return resultJsonObject;
};