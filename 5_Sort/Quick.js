Array.prototype.quickSort = function (left = 0, right = this.length - 1) {
  const pivot = (pivotIndex, endIndex) => {
    let temp = pivotIndex;
    for (let i = pivotIndex + 1; i <= endIndex; i++)
      if (this[i] < this[pivotIndex])
        [this[temp], this[i]] = [this[i], this[++temp]];
    [this[pivotIndex], this[temp]] = [this[temp], this[pivotIndex]];
    return temp;
  };

  if (left < right) {
    const pivotIndex = pivot(left, right);
    this.quickSort(left, pivotIndex - 1);
    this.quickSort(pivotIndex + 1, right);
  }
  return this;
};

console.log([4, 2, 3, 1, 5].quickSort());
