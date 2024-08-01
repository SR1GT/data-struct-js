function knapsackDP(weights, values, total) {
  let dp = new Array(weights.length); // rows
  dp[-1] = new Array(total + 1).fill(0); // columns
  for (let row = 0; row < weights.length; row++) {
    dp[row] = new Array(total).fill(0);
    for (let col = 0; col <= total; col++) {
      if (col < weights[row]) dp[row][col] = dp[row - 1][col];
      else
        dp[row][col] = Math.max(
          dp[row - 1][col],
          dp[row - 1][col - weights[row]] + values[row]
        );
    }
  }
  return dp[weights.length - 1][total];
}

console.log(knapsackDP([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10));
