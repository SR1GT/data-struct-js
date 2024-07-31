Array.prototype.binarySearch = function (target) {
  if (this.length === 0) return -1;

  const divide = (map, target, low = 0, high = this.length - 1) => {
    if (low > high) return -1;
    let mid = Math.floor((low + high) / 2);
    if (map[mid].value === target) return map[mid].index;
    else if (map[mid].value > target) return divide(map, target, low, mid - 1);
    else if (map[mid].value < target) return divide(map, target, mid + 1, high);
    else return -1;
  };

  let map = new Array();
  this.map((value, index) => map.push({ value: value, index: index }));
  map.sort((a, b) => a.value - b.value);
  return divide(map, target);
};

console.log([1, 0, 2, 4, 3].binarySearch(2));
