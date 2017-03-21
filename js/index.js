var votersApp = angular.module ('votersApp', []);

votersApp.controller('indexController', function indexController($scope, $http) {

    $scope.delegate = { you: '', other: '' };
    $scope.loading = 'no';
    $scope.node = 'liskwallet.punkrock.me';

    $scope.inspect = function () {
        $scope.loading = 'yes';

        //'/api/delegates/get?username=' + $scope.delegate.you
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
