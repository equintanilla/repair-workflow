/**
 * * service that keeps track of the information that the user selected
 * @constructor
 */
repair.RepairService = function () {
    this.device = null;
    this.model = null;
    this.color = null;
    this.network = null;
    this.issue = null;
    this.currentStage = repair.RepairService.StageOrder[0];

};


repair.RepairService.prototype.setCurrentStageAndMoveToNext = function (option) {
    if (option !== null || option !== undefined) {
        var stageSet = false;
        switch (this.currentStage) {
            case(repair.RepairService.Stages.DEVICE):
                this.setDevice(option);
                stageSet = true;
                break;

            case(repair.RepairService.Stages.MODEL):
                this.setModel(option);
                stageSet = true;
                break;

            case(repair.RepairService.Stages.COLOR):
                this.setColor(option);
                stageSet = true;
                break;

            case(repair.RepairService.Stages.NETWORK):
                this.setNetwork(option);
                stageSet = true;
                break;

            case(repair.RepairService.Stages.ISSUE):
                this.setIssue(option);
                stageSet = true;
                break;

        }
        if (stageSet) {
            this.switchToNewStage();

        }
    }
};

repair.RepairService.prototype.getCurrentStageName = function () {
    return this.currentStage;
};

repair.RepairService.prototype.getCurrentStageValue = function () {
    return this.getStageValue(this.currentStage);
};

repair.RepairService.prototype.getStageValue = function (stageName) {
    switch (stageName) {
        case(repair.RepairService.Stages.DEVICE):
            return this.getDevice();
        case(repair.RepairService.Stages.MODEL):

            return this.getModel();
        case(repair.RepairService.Stages.COLOR):
            return this.getColor();

        case(repair.RepairService.Stages.NETWORK):

            return this.getNetwork();
        case(repair.RepairService.Stages.ISSUE):
            return this.getIssue();

    }
};


/**
 * switches to new states starts from the first step onwards, returns the first stage with no value
 */
repair.RepairService.prototype.switchToNewStage = function () {
    for (var i = 0; i < repair.RepairService.StageOrder.length; i++) {
        var stage = repair.RepairService.StageOrder[i];
        if (this.getStageValue(stage) === null || this.getStageValue(stage) === undefined) {
            this.currentStage = stage;
            return;

        }
    }
};

repair.RepairService.prototype.setDevice = function (device) {
    this.device = device;

};

repair.RepairService.prototype.setModel = function (model) {
    this.model = model;

};

repair.RepairService.prototype.setColor = function (color) {
    this.color = color;

};

repair.RepairService.prototype.setNetwork = function (network) {
    this.network = network;

};

repair.RepairService.prototype.setIssue = function (issue) {
    this.issue = issue;
};


repair.RepairService.prototype.getDevice = function () {
    return this.device;
};

repair.RepairService.prototype.getModel = function () {
    return this.model;
};

repair.RepairService.prototype.getColor = function () {
    return this.color;
};

repair.RepairService.prototype.getNetwork = function () {
    return this.network;
};

repair.RepairService.prototype.getIssue = function () {
    return this.issue;
};

repair.RepairService.prototype.isRepairRequestReady = function () {
    return this.device !== null &&
        this.model !== null &&
        this.color !== null &&
        this.network !== null &&
        this.issue !== null;
};

/**
 * An object with stage names
 *
 */
repair.RepairService.Stages = {
    DEVICE: 'DEVICE',
    MODEL: 'MODEL',
    COLOR: 'COLOR',
    NETWORK: 'NETWORK',
    ISSUE: 'ISSUE'
};

/**
 * reverse map of repair.RepairService.Stages
 * @type {Array}
 */
repair.RepairService.StageOrder = [
    repair.RepairService.Stages.DEVICE,
    repair.RepairService.Stages.MODEL,
    repair.RepairService.Stages.COLOR,
    repair.RepairService.Stages.NETWORK,
    repair.RepairService.Stages.ISSUE
];


repair.RepairService.INJECTS = ['$http', repair.RepairService];