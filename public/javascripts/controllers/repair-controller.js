repair.RepairController = function ($scope, deviceInformationService, repairService) {
    this.$scope = $scope;
    this.repairService = repairService;
    this.deviceInformationService = deviceInformationService;
    var devicesPromise = deviceInformationService.getMobileDevices();
    devicesPromise.then(angular.bind(this, function (data) {
        this.options = deviceInformationService.devices;

    }));
};

repair.RepairController.prototype.getCurrentOptions = function () {
    return this.options;
};

repair.RepairController.prototype.chooseOption = function (option) {
    var stageBeforeSetting = this.repairService.getCurrentStageName();
    this.repairService.setCurrentStageAndMoveToNext(option);
    if (stageBeforeSetting !== this.repairService.getCurrentStageName()) {
        this.loadNewOptions();

    }
};

repair.RepairController.prototype.getPartial =  function(){
    return this.repairService && this.repairService.isRepairRequestReady()? 
       '/views/done-request.html': '/views/options.html';
};

repair.RepairController.prototype.loadNewOptions = function () {
    var stage = this.repairService.getCurrentStageName();
    
    var stages = repair.RepairService.Stages;
    var promise = null;
    if (stage === stages.MODEL) {
        promise = this.deviceInformationService.getMobileDevicesModels(this.repairService.getDevice().id);

    } else if (stage === stages.COLOR) {
        promise = this.deviceInformationService.getColors(this.repairService.getDevice().id, this.repairService.getModel().id);

    } else if (stage === stages.NETWORK) {
        promise = this.deviceInformationService.getNetworks(this.repairService.getDevice().id, this.repairService.getModel().id);

    } else if (stage === stages.ISSUE) {
        promise = this.deviceInformationService.getIssues(this.repairService.getDevice().id, this.repairService.getModel().id);

    }
    promise.then(angular.bind(this, function (response) {
        this.options = response.data;

    }));};

repair.RepairController.prototype.getCurrentTitle = function () {
    var device = this.repairService.getDevice();
    var deviceName = device ? device.name : null;
    return repair.RepairController.StageTitlesMap[this.repairService.getCurrentStageName()](deviceName);

};

repair.RepairController.StageTitlesMap = {};
(function () {
    var stageTitlesMap = repair.RepairController.StageTitlesMap;
    var stages = repair.RepairService.Stages;
    stageTitlesMap[stages.DEVICE] = function () {
        return 'Choose your device'
    };
    stageTitlesMap[stages.MODEL] = function (deviceName) {
        return 'Choose your ' + deviceName + '\'s model'
    };
    stageTitlesMap[stages.COLOR] = function (deviceName) {
        return 'Choose your ' + deviceName + '\'s color'
    };
    stageTitlesMap[stages.NETWORK] = function () {
        return 'Choose your network';
    };
    stageTitlesMap[stages.ISSUE] = function () {
        return 'What is the issue?'
    };
})();

repair.RepairController.INJECTS = ['$scope', 'deviceInformationService', 'repairService', repair.RepairController];