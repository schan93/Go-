'use strict';

angular.module('goApp')
.controller('ContactsCtrl', function ($scope, $http, Auth) {

	$scope.selectedFriends = [];

	$http.get('/api/users/me')
	.then(function(result){
		$scope.currentUser = result.data;
	});

	$scope.friendHelper = {
		friendAddText: "Add Friends!",
		friendsToAdd: true
	};

	$scope.addPendingFriend = function(){
		console.log("$selected freinds length: ", $scope.selectedFriends.length);
		for(var i = 0; i < $scope.selectedFriends.length; i++){
			$http.put('/api/users/friends/pending/confirm/' + $scope.currentUser.username, $scope.selectedFriends[i])
			.success(function(data){
			});
			var friendObject = {
				username: $scope.currentUser.username, 
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

$scope.friendHelper.friendsToAdd = false;
};


});
