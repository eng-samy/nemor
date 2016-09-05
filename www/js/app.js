// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('storeApp', ['ionic']);


  app.controller('homeApp', function($scope,$http){ 
  
});


app.controller('CategoryApp', function($scope,$http){ 
    $scope.posts = []; 

    $scope.loadMore = function() {
  var parameters = {
  offset: $scope.lastOffset
  };

    $http.get('http://www.hayaataal.com/nemor/api/getCategory',{params: parameters}).success(function(items) {
      //useItems(items);
      $scope.lastOffset = items.lastOffset;
       angular.forEach(items, function(item){
       $scope.posts.push(item);
    });
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
    });
  };

    $scope.doRefresh = function() {
      $scope.posts = [];
      $http({
    method:"GET",
    url:"http://www.hayaataal.com/nemor/api/getCategory?offset=0"
  }).then(function(postsData){
    angular.forEach(postsData.data, function(postsArr){
       $scope.posts.push(postsArr);
    });
    $scope.lastPostID = postsData.data.lastID;
    $scope.$broadcast('scroll.refreshComplete');
  });
  };

  $http({
    method:"GET",
    url:"http://www.hayaataal.com/nemor/api/getCategory?offset=0"
  }).then(function(postsData){
    console.log(postsData.data);
    angular.forEach(postsData, function(postsArr){
       $scope.posts.push(postsArr);
    });
    $scope.lastOffset = postsData.data.lastOffset;
    console.log($scope.lastOffset);
  });
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
