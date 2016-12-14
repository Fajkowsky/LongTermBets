(function () {
    "use strict";
    angular.module("App").run(Runner);

    Runner.$inject = ["$rootScope", "TranslationService"];

    function Runner($rootScope, TranslationService) {
        TranslationService.setUserLanguage($rootScope);
    }
}());
