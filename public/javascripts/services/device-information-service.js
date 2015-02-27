
/**
 * *  service that queries the server for device information and keeps it in a map
 * @param $http
 * @param $log
 * @param $q
 * @param webUtils
 * @constructor
 */
repair.DeviceInformationService = function ($http, $log, $q, webUtils) {
    this.$http = $http;
    this.$log = $log;
    this.$q = $q;
    this.webUtils = webUtils;
    
    this.devices = null;
    // map key'ed by the device Model
    this.deviceModelsMap = {};
    // this maps are key'ed by the key generated from this.getExtendedInformationMapKey()
    this.colorsMap = {};
    this.networksMap = {};
    this.issuesMap = {};
    
};

/**
 * *
 * @returns {angular.$q}
 */
repair.DeviceInformationService.prototype.getMobileDevices = function () {
    var promise = this.callICrackedServer('/mobiledevices');
    promise.then(angular.bind(this, function (response) {
        var data = response.data;
        this.devices = data;

    }));

    return promise;

};

/**
 * * returns a unique key string based in devide and modelId
 * @param deviceId
 * @param modelId
 * @returns {string}
 */
repair.DeviceInformationService.prototype.getExtendedInformationMapKey = function (deviceId, modelId) {

    return 'device_' + deviceId + '_model_' + modelId + '_';
};

/**
 * *
 * @param deviceId
 * @returns {angular.$q}
 */
repair.DeviceInformationService.prototype.getMobileDevicesModels = function (deviceId) {
    var promise = this.callICrackedServer('/mobiledevices/' + deviceId + '/models');
    promise.then(angular.bind(this, function (response) {
        var models = response.data;
        this.deviceModelsMap[deviceId] = models;

    }));

    return promise;
};

/**
 * * 
 * @param deviceId
 * @param modelId
 * @returns {angular.$q}
 *  
 */
repair.DeviceInformationService.prototype.getColors = function (deviceId, modelId) {
    var colorsPromise = this.callICrackedServer('/mobiledevices/' + deviceId + '/models/' + modelId + '/colors');
    colorsPromise.then(angular.bind(this, function (response) {
        var colors = response.data;
        this.colorsMap[this.getExtendedInformationMapKey(deviceId, modelId)] = colors;

    }));
    return colorsPromise;
};


/**
 * *
 * @param deviceId
 * @param modelId
 * @returns {angular.$q}
 *  
 */
repair.DeviceInformationService.prototype.getNetworks = function (deviceId, modelId) {
    var networkPromise = this.callICrackedServer('/mobiledevices/' + deviceId + '/models/' + modelId + '/networks');

    networkPromise.then(angular.bind(this, function (response) {
        var networks = response.data;
        this.networksMap[this.getExtendedInformationMapKey(deviceId, modelId)] = networks;

    }));
    return networkPromise;
};

/**
 *
 * @param deviceId
 * @param modelId
 * @returns {angular.$q}
 *
 */
repair.DeviceInformationService.prototype.getIssues = function (deviceId, modelId) {
    var issuesPromise = this.callICrackedServer('/mobiledevices/' + deviceId + '/models/' + modelId + '/issues');

    issuesPromise.then(angular.bind(this, function (response) {
        var issues = response.data;
        this.issuesMap[this.getExtendedInformationMapKey(deviceId, modelId)] = issues;

    }));
    return issuesPromise;
};

repair.DeviceInformationService.prototype.callICrackedServer = function (urlFragment, params) {
    var queryString = this.webUtils.getFullQueryString(params);

    var processedUrlFragment = urlFragment.charAt(0) !== '/' ? '/' + urlFragment : urlFragment;
    var promise = this.$http.get(repair.DeviceInformationService.ICRACKED_BASE_URL + processedUrlFragment + queryString);
    promise
        .then(angular.bind(this, function (response) {
            var data = response.data;

        }),
        angular.bind(this, function (error) {
            this.$log.error('error loading:' + urlFragment);

        }));
    return promise;

};

repair.DeviceInformationService.ICRACKED_BASE_URL = 'https://www.icracked.com/v2/api';

repair.DeviceInformationService.INJECTS = ['$http', '$log', '$q', 'webUtils', repair.DeviceInformationService];