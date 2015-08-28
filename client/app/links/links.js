angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  angular.extend($scope, Links);

  $scope.getLinks();
})
.factory('Links', function($http) {
  //track links with data property
  var data = { links: [] };
  //need a getlinks method that reads data
  var getLinks = function(){
    return $http({
      method: 'GET',
      url: '/api/links'  // might just be /api/links
    })
    .then(function(resp){
      console.log(resp.data);
      return resp.data;
    })
    .then(function(result){
      result.forEach(function(object) {
        data.links.push(object);
      });
    })
  };
  var link = {};
  var addLink = function(link){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })

  };
  //figure out the data format then push each link into the data array

  return {
    data: data,
    getLinks: getLinks,
    link: link,
    addLink: addLink
  }
})
