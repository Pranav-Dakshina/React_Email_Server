var app = angular.module('myApp', []);


app.controller('signInController', function($scope, $http) {

  // $scope.submit = function() {
  //   var data = {
  //     user: $scope.user,
  //     pass: $scope.pass
  //   };
  //
  //   $http.post('/auth/signIn',JSON.stringify(data)).then(function(response) {
  //     if (response.data) {
  //       console.log("Post Data Submitted Successfully!");
  //     }
  //   }, function (response) {
  //       console.log("Service not Exists");
  //       console.log(response.status);
  //       console.log(response.statusText);
  //       console.log(response.headers());
  //   });
  //
  // };

});

app.controller('signUpController', function($scope) {

  // var compareTo = function() {
  //     return {
  //         require: "ngModel",
  //         scope: {
  //             otherModelValue: "=compareTo"
  //         },
  //         link: function(scope, element, attributes, ngModel) {
  //
  //             ngModel.$validators.compareTo = function(modelValue) {
  //                 return modelValue == scope.otherModelValue;
  //             };
  //
  //             scope.$watch("otherModelValue", function() {
  //                 ngModel.$validate();
  //             });
  //         }
  //     };
  // };
  //
  // module.directive("compareTo", compareTo);
});

app.controller('logInController', function($scope, $http) {

  // $scope.submit3 = function() {
  //   var data = {
  //     pin: $scope.pin
  //   };
    // };



});
