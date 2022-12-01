//a
const text = await Deno.readTextFile("./input.txt");

const elvesItems = text.split("\n\n").map((item) => item.split("\n"));
const elvesItemSummed = elvesItems.map((item) =>
  item.reduce((a, b) => a + parseInt(b), 0)
);
const highestCalories = elvesItemSummed.sort((a, b) => b-a);
// const lowestCalories = elvesItemSummed.sort((a, b) => a-b)[0];

const highestCalorieElf = highestCalories[0]

console.log({ highestCalorieElf });

//b

const topThree = highestCalories.slice(0, 3);
const topThreesum = topThree.reduce((a, b) => a + b, 0);

console.log({ topThreesum });
