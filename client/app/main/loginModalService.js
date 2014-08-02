angular.module('loginModalService',[]).
  service('$loginModal',function($modal){
    var myModal = $modal({template:'app/main/test.html', show:false});

    this.show=function(){
        myModal.$promise.then(myModal.show);
      }
  
    this.hide = function() {
        myModal.$promise.then(myModal.hide);
      }
  });
  