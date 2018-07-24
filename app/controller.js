let app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve:{
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl: 'dashboard.html'
	})
	.when('/register', {
		templateUrl: 'registration.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});

//Defining Controller
app.controller('loginCtrl', function($scope, $location, $rootScope){
	$scope.submit =	function(){
		if($scope.username == 'ram' && $scope.password == 'welcome'){
			$rootScope.loggedIn = true;
			$location.path('/dashboard');
		}else{
			alert('wrong stuff');
		}
	};
});
app.controller('registerCtrl', function($scope, $location, $rootScope){
	$scope.submit = function(){
		if($scope.phoneNumber == '8802232770'){
			$rootScope.register = true;
			$location.path('/login');
		}else{
			alert('Wrong Stuff');
		}
	}
});