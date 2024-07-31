Array.prototype.selectionSort = function () {
  let minIndex = this[0];
  for (let i = 0; i < this.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < this.length; j++)
      if (this[j] < this[minIndex]) minIndex = j;
    if (i !== minIndex) [this[i], this[minIndex]] = [this[minIndex], this[i]];
  }
  return this;
};

console.log([4, 2, 3, 1, 5].selectionSort());
