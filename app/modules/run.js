(function () {
    "use strict";
    angular.module("App").run("Runner", Runner);

    Runner.$inject = ["$rootScope", "TranslationService"];

    function Runner($rootScope, TranslationService) {
    }
}());
