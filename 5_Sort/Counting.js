Array.prototype.countingSort = function () {
  let counter = [];
  for (let item of this)
    if (counter[item]) counter[item].push(item);
    else counter[item] = [item];
  this.length = 0;
  for (let item of counter) if (item) Array.prototype.push.apply(this, item);
  return this;
};

console.log([4, 2, 3, 1, 5].countingSort());
