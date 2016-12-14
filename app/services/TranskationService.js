(function () {
    "use strict";
    angular.module("App").factory("TranslationService", TranslationService);

    TranslationService.$inject = [];

    function TranslationService() {
        var service = {
            hello: hello
        };

        return service;

        function hello() {
            return "hello";
        }
    }
}());
