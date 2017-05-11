var TableSorting = angular.module('tableSorting', []);
TableSorting.controller('SortingCtrl', function($scope, $http) {

    $scope.sort = {
        active: 'userId',
        descending: undefined
    }

    $scope.init = function() {
        Tabledata();
    };

    var Tabledata = function() {
        var url = "http://jsonplaceholder.typicode.com/posts";
        $http.get(url).success(function(data) {
            $scope.Datas = data;
        });
    };

    $scope.changeSorting = function(jsondata) {

        var sort = $scope.sort;

        if (sort.active == jsondata) {
            sort.descending = !sort.descending;
        } else {
            sort.active = jsondata;
            sort.descending = false;
        }
    };

    $scope.getIcon = function(jsondata) {

        var sort = $scope.sort;

        if (sort.active == jsondata) {
            return sort.descending ?
                'fa fa-sort-asc'
                :'fa fa-sort-desc';
        }
    }
    $scope.init();
});