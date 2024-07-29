(function() {
    'use strict';
  
    angular.module('NarrowItDownApp')
      .factory('MenuSearchService', MenuSearchService);
  
    MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
    
    function MenuSearchService($http, $q, ApiBasePath) {
      var service = {
        getMatchedMenuItems: getMatchedMenuItems
      };
  
      return service;
  
      ////////////
  
      function getMatchedMenuItems(searchTerm) {
        if (!searchTerm) {
          return $q.when([]);
        }
  
        return $http.get(ApiBasePath + "/menu_items.json")
          .then(function(response) {
            return filterItems(response.data, searchTerm);
          })
          .catch(function(error) {
            console.error('Failed to fetch menu items. Error:', error);
            return [];
          });
      }
  
      function filterItems(data, searchTerm) {
        var searchItems = [];
        for (var category in data) {
          searchItems.push(
            data[category].menu_items.filter((item) =>
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        return searchItems.flat();
      }
    }
  
  })();
  