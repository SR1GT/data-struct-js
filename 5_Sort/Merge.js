Array.prototype.mergeSort = function () {
  if (this.length <= 1) return this;

  const merge = (array1, array2) => {
    let i = 0, j = 0, result = [];
    while (i < array1.length && j < array2.length)
      if (array1[i] < array2[j]) result.push(array1[i++]);
      else result.push(array2[j++]);
    while (i < array1.length) result.push(array1[i++]);
    while (j < array2.length) result.push(array2[j++]);
    return result;
  };

  let mid = Math.floor(this.length / 2),
    left = this.slice(0, mid),
    right = this.slice(mid);
  return merge(left.mergeSort(), right.mergeSort());
};

console.log([4, 2, 3, 1, 5].mergeSort());
