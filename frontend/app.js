const emailSystem = angular.module('emailSystem', []);

emailSystem.controller('emailSystemController', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = () => {
        const data = JSON.stringify({
            name: $scope.name,
            email: $scope.email
        });
        $http.post('http://localhost:3000/home/signup', data)
            .then(response => {
                $scope.message = 'Thank you for signing up! An email will be sent shortly.';
                $scope.name = '';
                $scope.email = '';
                console.log(response);
            })
            .catch(err => {
                $scope.message = err.data.data[0].msg;
                console.log(err);
            });
    }
}]);