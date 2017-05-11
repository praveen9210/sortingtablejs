describe('Unit Testing: Display data to table from Json', function() {

    var scope, $controllerConstructor, $http;
    beforeEach(module('tableSorting'));

    beforeEach(inject(function($rootScope, $controller, $http) {
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
        http = $http;
        $controllerConstructor('SortingCtrl', {
            $scope: scope,
            $http: http
        });
    }));

    it('Should get data if success ', function() {
     var responseData = {data:{id:1}};
       var responseObj = {
         then: function (success, error) {

             success(responseData);
             error(responseData);
         }
       };

       var httpwrapStub = sinon.stub(http, 'get');
       httpwrapStub.returns(responseObj);
       scope.initialise();
       expect(scope.Datas).to.equal(responseData.data);
       expect(httpwrapStub.calledOnce).to.be.ok;
       httpwrapStub.restore();
     });

     it('Should throw an error, data not loading ', function() {
       var responseData = {};
       var responseObj = {
         then: function (success, error) {

             success(responseData);

             error(responseData);
         }
       };

       var httpwrapStub = sinon.stub(http, 'get');
       httpwrapStub.returns(responseObj);
       scope.initialise();
       expect(scope.Datas).to.equal(undefined);
       expect(httpwrapStub.calledOnce).to.be.ok;
       httpwrapStub.restore();
     });

    it('should load json data in table', function() {
        scope.active = '';
        scope.changeSorting('userId');
        expect(scope.sort.active).to.equal("userId");
        expect(scope.sort.descending).to.equal(true);
    });

    it('should display down arrow by default for userid ', function() {
        scope.sort.active = 'userId';
        var result = scope.getIcon(scope.sort.active);
        expect(result).to.equal('fa fa-sort-desc');
    });
    it('should display down arrow for descending order', function() {
        scope.sort.active = 'userId';
        scope.sort.descending = true;
        var result = scope.getIcon(scope.sort.active);
        expect(result).to.equal('fa fa-sort-asc');
    });
});