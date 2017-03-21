var votersApp = angular.module ('votersApp', ['ngAnimate', 'toastr']);

votersApp.controller('indexController', function indexController($scope, $http, toastr) {

    $scope.delegate = { you: '', other: '' };
    $scope.loading = 'no';
    $scope.node = 'https://liskwallet.punkrock.me:8000';
    $scope.error = '';
    $scope.data = {};

    updateDelegate = function (name, handler) {
        $http.get ($scope.node + '/api/delegates/get?username=' + name).then (
            function (data) {
                if (!data.data.success) {
                    $scope.error = 'Delegate ' + name + ' not found.';
                    $scope.error = 'err';
                    toastr.error('Delegate name error: ' + name + 'does not exist', 'Error');
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
        ).catch(function (err) {
            console.log(err)
            toastr.error('Node problem', 'Error');
        });
    };

    $scope.inspect = function () {
        if($scope.delegate.you != '' && $scope.delegate.other != '') {
            updateDelegate($scope.delegate.you, function (data) {
                $scope.data.you = data;
                updateDelegate($scope.delegate.other, function (data) {
                    $scope.loading = 'yes';
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
                        $scope.notshared.push(mapped[k]);
                    }
                    $scope.notshared.sort(function (a, b) {
                        return b.balance - a.balance;
                    });
                    toastr.success('Diff ready', 'Success');
                    $scope.loading = 'completed';
                });
            });
        } else toastr.warning('Fill delegates', 'Warning');
    };
});
