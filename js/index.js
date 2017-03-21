var votersApp = angular.module ('votersApp', []);

votersApp.controller('indexController', function indexController($scope, $http) {
    $scope.delegate = { you: '', other: '' };
    $scope.loading = 'no';
    $scope.node = '';

    $scope.inspect = function () {
        $scope.loading = 'yes';

        //'/api/delegates/get?username=' + $scope.delegate.you
    };
});
