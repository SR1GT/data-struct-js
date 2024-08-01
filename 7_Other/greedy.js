function knapsackGreedy(weights, values, total) {
  let marks = [];
  for (let index = 0; index < weights.length; index++)
    marks.push({
      id: index,
      weight: weights[index],
      value: values[index],
      mark: values[index] / weights[index],
    });
  marks.sort((a, b) => b.mark - a.mark);

  let selections = [],
    valueTotal = 0;
  for (let item of marks) {
    if (item.weight <= total) {
      selections.push({
        id: item.id,
        weights: item.weight,
        values: item.value,
        rate: 1,
      });
      total -= item.weight;
      valueTotal += item.value;
    } else if (total > 0) {
      const rate = total / item.weight;
      selections.push({
        id: item.id,
        weights: item.weight * rate,
        values: item.value * rate,
        rate: rate,
      });
      valueTotal += item.value * rate;
      break;
    } else break;
  }
  return valueTotal;
}

console.log(knapsackGreedy([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10));
