(function () {
    "use strict";
    angular.module("App").factory("TranslationService", TranslationService);

    TranslationService.$inject = ["$http", "$window", "TRANSLATIONS"];

    function TranslationService($http, $window, TRANSLATIONS) {
        var service = {
            defaultLanguage: TRANSLATIONS.defaultLanguage,
            userLanguage: TRANSLATIONS.defaultLanguage,
            translation: {},
            setTranslation: setTranslation,
            setUserLanguage: setUserLanguage
        };

        return service;

        function getUserLanguage() {
            var language = $window.navigator.userLanguage || $window.navigator.language;
            return language.substring(0, 2);
        }

        function setUserLanguage($scope) {
            service.userLanguage = getUserLanguage();
            setTranslation($scope, service.userLanguage);
        }

        function setTranslation($scope, translation) {
            function success(response) {
                $scope.translation = service.translation = response.data;
            }

            function error() {
                setTranslation($scope, service.defaultLanguage);
            }

            var url = TRANSLATIONS.dir + translation.toUpperCase() + ".json";
            $http.get(url).then(success, error);
        }
    }
}());
