(function() {
    'use strict';

    angular.module('appAssignment1', [])
        .controller('Assignment1Controller', ['$scope', function($scope) {
            $scope.items = '';
            $scope.message = '';
            $scope.classChecker = null;

            $scope.checkItems = function() {
                const dishes = $scope.items.split(',').map(item => item.trim()).filter(Boolean);

                if (dishes.length === 0) {
                    $scope.message = 'Please enter dishes you usually have for lunch.';
                    $scope.classChecker = false;
                } else {
                    $scope.classChecker = true;
                    $scope.message = dishes.length > 3 ? 'Too much!' : 'Enjoy!';
                }
            };
        }]);
})();
