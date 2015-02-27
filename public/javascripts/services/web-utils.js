function WebUtils() {

}

WebUtils.prototype.createQueryString = function (params) {
    var queryString = '';
    if (!(params == null || params == undefined)) {
        for (var paramKey in params) {
            var paramValue = params[paramKey];
            queryString += paramKey + '=' + paramValue + '&';
        }
    }
    if (queryString.length > 0) {
        //we remove the last '&' from the string
        queryString = queryString.substring(0, queryString.length - 1);

    }
    return queryString;
};

WebUtils.prototype.getFullQueryString = function (params) {
    var queryString = this.createQueryString(params);
    if (queryString.length > 0) {
        queryString = '?' + queryString;
    }

    return queryString;
};


WebUtils.INJECTS = [WebUtils];