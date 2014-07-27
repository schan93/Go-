'use strict';

angular.module('goApp')
  .controller('ListviewCtrl', function ($scope, $http, $location, listviewFactory, $routeParams) {

    // $scope.items = [
    //   {
    //     title: 'title1',
    //     date: new Date(),
    //     filesize: '45678',
    //     width: '400',
    //     height: '600',
    //     tags: ['wedding','travel'],
    //     thumb: 'cover1.jpg'
    //   },
    //   {
    //     title: 'title2',
    //     date: new Date(),
    //     filesize: '1567802',
    //     width: '300',
    //     height: '500',
    //     tags: ['wedding'],
    //     thumb: 'cover2.jpg'
    //   },
    //   {
    //     title: 'title3',
    //     date: new Date(),
    //     filesize: '4567822',
    //     width: '400',
    //     height: '500',
    //     tags: ['travel', 'family'],
    //     thumb: 'cover3.jpg'
    //   }
    // ];
  
    function humanFileSize(bytes, si) {
      var thresh = si ? 1000 : 1024;
      if(bytes < thresh) return bytes + ' B';
      var units = si ? ['KB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
      var u = -1;
      do {

        bytes /= thresh;
        ++u;
      } while(bytes >= thresh);
      return bytes.toFixed(0)+' '+units[u];
    }

    function formatDate(dateStr) {
      var datetime = new Date(dateStr);
      var year = datetime.getFullYear();
      var month = datetime.getMonth();
      var date = datetime.getDate();
      var hours = datetime.getHours();
      var minutes = datetime.getMinutes();

      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;

      return date + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ampm;
    }
    
    function formatDimension(ratio, item){
        if(item.width && item.height){
        return item.width + ' x ' + item.height;
      }else{
        return '';
      }
    }

    function thumb(item){
      return 'http://hkbuys.qiniudn.com/' + item.thumb;
    }
    
    $scope.listview = {};
    $scope.listview.methods = {
      //startDate: formatDate,
      //endDate: formatDate,
      //filesize: humanFileSize,
      //dimension: formatDimension,
      thumb: thumb
    };

    $scope.openEventInformation = function(){
      console.log("Clicked.");
    };

    // Get list of events
    //$scope.events = listviewFactory.query();
    /*for(var i = 0; i < $scope.events.length(); i++){

    }*/
    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });

    $scope.test = {
      'startDate': "aaa",
      'endDate': "",
      'eventLocation': "",
      'eventName': ""
    };

$scope.grabEventData = function(event){
      $scope.test.startDate = event.startDate;
      $scope.test.endDate = event.endDate;
      $scope.test.eventLocation = event.eventLocation;
      $scope.test.eventName = event.eventName;
      console.log("In!");
      $location('/event.eventName');
      /*$http.get('events/:id', $routeParams.id)
      .success(function(event){
        $scope.test = event;
      });*/
}

$scope.testFunction = function(){
  console.log("Test event name: ", $scope.test.eventName);
}


      $scope.test = listviewFactory.get({show: $routeParams.id});


    //Get just 1 event
    //$scope.test = listviewFactory.get({id: $routeParams.id});
    /*$http.get({_id: id}, '/api/events')
      .success($routeParams.id, function(data, status, headers, config){
        $scope.test = data;
      });*/

    // listviewFactory.getEvents().then(function (events){
    //   $scope.teststuff = events;
    //   console.log("List view:" + events + " Test stuff: " + JSON.stringify($scope.teststuff, null, 4));
    //   }, function(error){ 
    //     console.error(error);
    //   });
  });
