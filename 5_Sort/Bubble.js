Array.prototype.bubble = function () {
  for (let i = this.length - 1; i > 0; i--)
    for (let j = 0; j < i; j++)
      if (this[j] > this[j + 1])
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
  return this;
};

console.log([4, 2, 3, 1, 5].bubble());
