Array.prototype.radixSort = function (digit = 1) {
  if (this.length < 2) return this;

  const regroup = (array, digit = 1) => {
    let buckets = Array.from({ length: 10 }, () => []),
      flag = false,
      digitPow = Math.pow(10, digit - 1);
    for (let item of array) {
      if (!flag && item >= digitPow * 10) flag = true;
      buckets[Math.floor((item / digitPow) % 10)].push(item);
    }
    array = buckets.reduce((acc, curr) => acc.concat(curr), []);
    return flag ? regroup(array, digit + 1) : array;
  };

  return regroup(this);
};

console.log([4, 2, 3, 1, 5].radixSort());
