angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('HomeCtrl', function($scope,$http) {
  $scope.moreCategories = true;
   $scope.posts = []; 

    $scope.loadMore = function() {
  var parameters = {
  offset: $scope.lastOffset
  };

    $http.get('http://www.hayaataal.com/nemor/api/getCategory',{params: parameters}).success(function(items) {
      //useItems(items);
      $scope.lastOffset = items.lastOffset;
      if(items.itemsNum != 0){
       angular.forEach(items, function(item){
       $scope.posts.push(item);
    });
     }else{
      $scope.moreCategories = false;
     }
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
    $scope.lastOffset = postsData.data.lastOffset;
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
})

.controller('CategoryCtrl', function($scope, $stateParams, $http) {
   $scope.cat_id = $stateParams.categoryID;
    $scope.moreProducts = true;

  $scope.products = []; 

    $scope.loadMore = function() {
  var pro_parameters = {
    cat_id: $scope.cat_id,
    offset: $scope.lastPOffset
  };

    $http.get('http://www.hayaataal.com/nemor/api/getProducts',{params: pro_parameters}).success(function(proitems) {
      //useItems(items);
      $scope.lastPOffset = proitems.lastOffset;
      if(proitems.itemsNum != 0){
       angular.forEach(proitems, function(proitem){
       $scope.products.push(proitem);
    });
     }else{
      $scope.moreProducts = false;
     }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
    });
  };

    $scope.doRefresh = function() {
      $scope.products = [];
      $http({
    method:"GET",
    url:"http://www.hayaataal.com/nemor/api/getProducts?offset=0&cat_id="+$scope.cat_id
  }).then(function(productsData){
    angular.forEach(productsData.data, function(productsArr){
       $scope.products.push(productsArr);
    });
    $scope.lastPOffset = productsData.data.lastOffset;
    $scope.$broadcast('scroll.refreshComplete');
  });
  };

  $http({
    method:"GET",
     url:"http://www.hayaataal.com/nemor/api/getProducts?offset=0&cat_id="+$scope.cat_id
  }).then(function(productsData){
    angular.forEach(productsData, function(productsArr){
       $scope.products.push(productsArr);
    });
    $scope.lastPOffset = productsData.data.lastOffset;
  });
})

.controller('ProductCtrl', function($scope,$http,$stateParams) {
  $scope.productID = $stateParams.productID;
  $scope.productDetails = []; 
  $scope.productPhotos = []; 

   $http({
    method:"GET",
     url:"http://www.hayaataal.com/nemor/api/getProduct?id="+$scope.productID
  }).then(function(productInfo){
    $scope.productItemID = productInfo.data.id;
    $scope.productItemTitle = productInfo.data.title;
    $scope.productItemDes = productInfo.data.des;
    $scope.productItemPrice = productInfo.data.price;
    $scope.productItemDiscount = productInfo.data.discount;
    $scope.productItemImg = productInfo.data.img;
    angular.forEach(productInfo.data.photoData, function(productPhoto){
       $scope.productPhotos.push(productPhoto);
    });
  });

})
.controller('ContactCtrl', function($scope,$http,$stateParams) {
  $scope.formModel={};
  $scope.hasError = false;
  $scope.hasApp = false;
  $scope.resultOper = '';
    $scope.onSubmit = function(valid){
      if(valid){
        var postID = $stateParams.productID;
      var postFullname = $scope.formModel.fullName;
      var postEmail = $scope.formModel.email;
      var postPhone = $scope.formModel.phone;
      var postAddress = $scope.formModel.address;
      var postDes = $scope.formModel.des;

      var parameters = {
  product_id: postID,
  fullname: postFullname,
  email: postEmail,
  phone: postPhone,
  address: postAddress,
  des: postDes
  };

    $http.get('http://www.hayaataal.com/nemor/api/insertOrder',{params: parameters}).success(function(resultArr) {
      if(resultArr.status == 'ok'){
        $scope.hasApp = true;
        $scope.hasError = false;
        $scope.resultOper = resultArr.message;
        setTimeout(
        function() 
        { 
          $route.reload();
        window.location = '#/app/product/'+postID;
        }, 2000);

      }else{
        $scope.hasApp = true;
        $scope.hasError = true;
        $scope.resultOper = resultArr.message;
      }
    });

      }else{
        $scope.hasApp = true;
        $scope.hasError = true;
        $scope.resultOper = 'يوجد خطأ او عدم اكتمال البيانات. برجاء المراجعة';
      }
      
    };
});
