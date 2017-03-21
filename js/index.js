var votersApp = angular.module ('votersApp', []);

votersApp.controller('indexController', function indexController($scope, $http) {

    $scope.delegate = { you: 'dakk', other: 'liskit' };
    $scope.loading = 'no';
    $scope.node = 'http://liskwallet.punkrock.me:8000';
    $scope.error = '';
    $scope.data = {};

    updateDelegate = function (name, handler) {
        $http.get ($scope.node + '/api/delegates/get?username=' + name).then (
            function (data) {
                if (!data.data.success) {
                    $scope.error = 'Delegate ' + name + ' not found.';
                    $scope.error = 'err';
                    return;
                }

                $http.get ($scope.node + '/api/accounts/getBalance?address=' + data.data.delegate.address).then (
                    function (data2) {
                        data.data.delegate.balance = data2.data.balance / 100000000;
                        return handler (data.data.delegate);
                    }
                );
            }
        );
    };

    $scope.inspect = function () {
        $scope.loading = 'yes';

        updateDelegate ($scope.delegate.you, function (data) {
            $scope.data.you = data;
            updateDelegate ($scope.delegate.other, function (data) {
                $scope.data.other = data;
                $scope.loading = 'completed';
            });
        });
    };

    /*$scope.lignode = "liskwallet.punkrock.me"
    $scope.address = ""
    $scope.addressToCompare = ""

    $scope.checkDiff = function() {
        if($scope.addressToCompare == "" && $scope.address == "") {
            console.log("empty use toastr")
        } else {
            console.log($scope.address, $scope.addressToCompare)
        }
    }
    */

});
