Array.prototype.insertion = function () {
  let temp, j;
  for (let i = 1; i < this.length; i++) {
    (temp = this[i]), (j = i - 1);
    for (; this[j] > temp && j >= 0; j--) this[j + 1] = this[j];
    this[j + 1] = temp;
  }
  return this;
};

console.log([4, 2, 3, 1, 5].insertion());
