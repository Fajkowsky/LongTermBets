(function () {
    "use strict";
    angular.module("lodash", []);
    angular.module("lodash").factory("_", lodash);

    lodash.$inject = ["$window"];

    function lodash($window) {
        return $window._;
    }
}());
