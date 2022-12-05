const text = await Deno.readTextFile("input.txt");

const asciiStartLowercase = 97;
const asciiStartUppercase = 65;

const rucksacks = text.split("\n");

// A
const splitRucksacks = rucksacks.map((rucksack) => {
  const full = rucksack.length;
  const half = full / 2;
  const compartmentOne = new Set(rucksack.slice(0, half).split(""));
  const compartmentTwo = new Set(rucksack.slice(half, full).split(""));
  return [compartmentOne, compartmentTwo];
});

const output: Array<string[]> = [];

for (const [compartmentOne, compartmentTwo] of splitRucksacks) {
  const intersection: Array<string> = [];
  for (const item of compartmentOne) {
    if (compartmentTwo.has(item)) {
      intersection.push(item);
    }
  }
  if (intersection.length > 0) {
    output.push(intersection);
  }
}

//B
const groupOfElves = text.split("\n").reduce((acc, line, index) => {
  if (index === 0) {
    acc.push([line.split("")]);
    return acc;
  }
  if (index % 3 === 0) {
    acc.push([line.split("")]);
    return acc;
  }
  acc.at(-1)!.push(line.split(""));
  return acc;
}, [] as unknown as string[][][]);

const intersectionOfGroups = groupOfElves.map((grp) => {
  const [first, second, third] = grp;
  const firstIntersection = first.filter((letter) => second.includes(letter));
  const secondIntersectoin = firstIntersection.filter((letter) =>
    third.includes(letter)
  );
  return [...new Set(secondIntersectoin)];
}).filter((grp) => grp.length > 0);


//Common output
const getLetterValue = (letter: string) => {
  if (letter.charCodeAt(0) >= asciiStartLowercase) {
    return letter.charCodeAt(0) - asciiStartLowercase + 1;
  }
  return letter.charCodeAt(0) - asciiStartUppercase + 27;
};

const getGroupedValues = (group: Array<string[]>) => {
  return group.reduce((acc, curr) => {
    // console.log(curr);
    acc += getLetterValue(curr[0]);
    // console.log({ [curr[0]]: getLetterValue(curr[0]) });
    return acc;
  }, 0);
};

const sum1 = getGroupedValues(output);
const sum2 = getGroupedValues(intersectionOfGroups);

console.log({sum1, sum2});
//{ sum1: 7903, sum2: 2548 }
