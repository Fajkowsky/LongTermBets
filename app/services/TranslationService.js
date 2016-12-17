(function () {
    "use strict";
    angular.module("App").factory("TranslationService", TranslationService);

    TranslationService.$inject = ["$http", "$window", "TRANSLATIONS"];

    function TranslationService($http, $window, TRANSLATIONS) {
        let service = {
            defaultLanguage: TRANSLATIONS.defaultLanguage,
            userLanguage: TRANSLATIONS.defaultLanguage,
            translation: {},
            setTranslation,
            setUserLanguage
        };

        return service;

        function getUserLanguage() {
            const language = $window.navigator.userLanguage || $window.navigator.language;
            return language.substring(0, 2);
        }

        function setUserLanguage($scope) {
            service.userLanguage = getUserLanguage();
            setTranslation($scope, service.userLanguage);
            appendi18n($scope, service.userLanguage);
        }

        function appendi18n() {

        }

        function setTranslation($scope, translation) {
            function success(response) {
                $scope.translation = service.translation = response.data;
            }

            function error() {
                setTranslation($scope, service.defaultLanguage);
            }

            const url = TRANSLATIONS.dir + translation.toUpperCase() + ".json";
            $http.get(url).then(success, error);
        }
    }
}());
