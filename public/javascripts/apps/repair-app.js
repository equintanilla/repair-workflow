(function () {
    angular.module('repairApp', [])
        .service('webUtils', WebUtils.INJECTS)
        .service('repairService', repair.RepairService.INJECTS)
        .service('deviceInformationService', repair.DeviceInformationService.INJECTS)
        .controller('repairController', repair.RepairController.INJECTS)
    ;
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['repairApp']);
    });
})();
