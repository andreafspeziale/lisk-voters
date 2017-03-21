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

                        $http.get ($scope.node + '/api/delegates/voters?publicKey=' + data.data.delegate.publicKey).then (
                            function (data3) {
                                data.data.delegate.voters = data3.data.accounts;
                                return handler (data.data.delegate);
                            }
                        );
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

                $scope.notshared = [];

                /* Compute the diff */
                var mapped = {};
                for (var i = 0; i < $scope.data.other.voters.length; i++) {
                    var el = $scope.data.other.voters[i];
                    mapped [el.username || el.address] = el;
                }

                for (var i = 0; i < $scope.data.you.voters.length; i++) {
                    var el = $scope.data.you.voters[i];
                    var k = el.username || el.address;
                    if (k in mapped) {
                        delete mapped[k];
                    }
                }

                for (var k in mapped) {
                    $scope.notshared.push (mapped[k]);
                }
                $scope.notshared.sort (function (a, b) { return b.balance - a.balance; });

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
