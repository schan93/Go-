'use strict';

angular.module('goApp')
  .controller('ProfileCtrl', function ($scope, $cookieStore, $routeParams, User, Auth, $http, filterFilter) {
   
   $scope.individualEvent = {};

    $http.get('/api/users/me')
      .then(function(result){
        $scope.user = result.data;
          $http.get('/api/users/events/' + $scope.user._id)
            .success(function(data, status, headers, config){
              //Used for displaying data
              $scope.currentUser = data;
            });
      });

    $scope.friendHelper = {
      'friendText': "Friend me!",
      'friendRequest': false,
      'friendAddText': "Add friend(s)!",
      'friendsToAdd': true
    };

    $scope.selectedFriends = [];


//PENDING = I HAVE A FRIEND PENDING
//REQUESTED = I HAVE REQUESTED THIS GUY TO BE MY FREIND

$scope.addPendingFriend = function(){
  console.log("$selected freinds length: ", $scope.selectedFriends.length);
  for(var i = 0; i < $scope.selectedFriends.length; i++){
    $http.put('/api/users/friends/pending/confirm/' + $scope.user.username, $scope.selectedFriends[i])
      .success(function(data){
    });

    var friendObject = {
      username: $scope.user.username, 
      invited: false, 
      pending: true, 
      requested: true
    };

    //In this case, user == schan93. We loop through HIS array and we get the one that matches the user's username
    $http.put('/api/users/friends/pending/confirm/' + $scope.selectedFriends[i].username, 
      friendObject)
      .success(function(data){
    });
    $scope.selectedFriends[i].requested = true;
  }
  friendHelper.friendsToAdd = false;
};



    $scope.getEvent = function(event){
      $scope.individualEvent = event;
    }

  })
  .directive('contenteditable', function(){
  	return {
  		restrict :'A',
  		require: '?ngModel',
  		link: function(scope, element, attrs, ngModel){
  			if(!ngModel) return;
  			ngModel.$render = function(){
  				element.html(ngModel.$viewValue || '');
  			};

  			element.on('blur keyup change', function(){
  				scope.$apply(readViewText);
  			});

  			function readViewText(){
  				var html = element.html();
  				if(attrs.stripBr && html == '<br>'){
  					html = '';
  				}
  				ngModel.$setViewValue(html);
  			}
  		}
  	};
  });