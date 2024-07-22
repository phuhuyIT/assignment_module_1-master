(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtController)
    .factory('ShoppingFactory', ShoppingFactory);

  ToBuyController.$inject = ['ShoppingFactory'];
  function ToBuyController(ShoppingFactory) {
    const vm = this;
    const shoppingService = ShoppingFactory;

    vm.items = shoppingService.getToBuyItems();

    vm.buyItem = (index) => {
      shoppingService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingFactory'];
  function AlreadyBoughtController(ShoppingFactory) {
    const vm = this;
    const shoppingService = ShoppingFactory;

    vm.items = shoppingService.getBoughtItems();

    vm.isShoppingFinished = () => shoppingService.isShoppingFinished();
  }

  function ShoppingFactory() {
    const toBuyItems = [
      { name: "Bread", quantity: 2 },
      { name: "Eggs", quantity: 12 },
      { name: "Apples", quantity: 6 },
      { name: "Tomatoes", quantity: 5 },
      { name: "Cheese", quantity: 1 },
      { name: "Chicken", quantity: 3 },
      { name: "Rice", quantity: 1 },
      { name: "Butter", quantity: 2 }
    ];

    const boughtItems = [];

    return {
      getToBuyItems: () => toBuyItems,
      getBoughtItems: () => boughtItems,
      buyItem: (index) => {
        const [item] = toBuyItems.splice(index, 1);
        boughtItems.push(item);
      },
      isShoppingFinished: () => toBuyItems.length === 0
    };
  }
})();
