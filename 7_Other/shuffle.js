Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [this[i], this[randomIndex]] = [this[randomIndex], this[i]];
  }
  return this;
};

console.log([1, 2, 3, 4, 5].shuffle());
