Array.prototype.orderSearch = function (target) {
  for (let index in this) if (this[index] === target) return index;
  return -1;
};

console.log([0, 1, 2, 3, 4].orderSearch(2));
