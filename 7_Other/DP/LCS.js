function LCS(string1, string2) {
  let dp = [new Array(string2.length + 1).fill(0)],
    result = "";
  for (let row = 1; row <= string1.length; row++) {
    dp[row] = [0];
    for (let col = 1; col <= string2.length; col++) {
      if (string1[row - 1] === string2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1] + 1;
        if (
          dp[row][col] > dp[row - 1][col] &&
          dp[row][col] > dp[row][col - 1] &&
          result.length === dp[row][col] - 1
        )
          result += string1[row - 1];
      } else dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
    }
  }
  return result;
}

console.log(LCS("acbaed", "abcadf"));
