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
            return filterItems(response.data.menu_items, searchTerm);
          })
          .catch(function(error) {
            console.error('Failed to fetch menu items. Error:', error);
            return [];
          });
      }
  
      function filterItems(items, searchTerm) {
        return items.filter(function(item) {
          return item.description.indexOf(searchTerm) !== -1;
        }) || [];
      }
    }
  
  })();
  