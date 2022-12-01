const text = await Deno.readTextFile("./input.txt");

const elvesItems = text.split("\n\n").map((item) => item.split("\n"));
const elvesItemSummed = elvesItems.map((item) =>
  item.reduce((a, b) => a + parseInt(b), 0)
);
const highestCalories = elvesItemSummed.sort((a, b) => b-a)[0];
const lowestCalories = elvesItemSummed.sort((a, b) => a-b)[0];

console.log({ elvesItems });
console.log({ elvesItemSummed });
console.log({ highestCalories });
console.log({ lowestCalories });
