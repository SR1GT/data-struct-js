Array.prototype.insertionSearch = function (target) {
  if (this.length === 0) return -1;

  const divide = (map, target, low = 0, high = this.length - 1) => {
    if (low > high || target < map[low].value || target > map[high].value)
      return -1;
    let mid =
      low +
      Math.floor(
        (
          (target - map[low].value) / (map[high].value - map[low].value)
        ) * (high - low)
      );

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

console.log([1, 0, 2, 4, 3].insertionSearch(2));
