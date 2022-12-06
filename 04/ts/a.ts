const text = await Deno.readTextFile("input.txt");
// const text = '50-50,5-86';
const pairs = text.split("\n").filter(Boolean);

const containsAll = (arr1: number[], arr2: number[]) => {
  if (arr1.length <= arr2.length) {
    return arr1.every((item) => arr2.includes(item));
  }
  return arr2.every((item) => arr1.includes(item));
};

const containsAtAll = (arr1: number[], arr2: number[]) => {
  return arr1.some((item) => arr2.includes(item));
};

const getOutput = (pairs: string[], type: 'a' | 'b') => {
  return pairs
    .map((pair) => {
      const [leftPerson, rightPerson] = pair.split(",");

      const [leftPersonStart, leftPersonEnd] = leftPerson.split("-");
      const leftPersonDiff =
        parseInt(leftPersonEnd) - parseInt(leftPersonStart);
      const [rightPersonStart, rightPersonEnd] = rightPerson.split("-");
      const rightPersonDiff =
        parseInt(rightPersonEnd) - parseInt(rightPersonStart);

      const leftNumbers = Array.from(
        { length: leftPersonDiff + 1 },
        (_, i) => i + parseInt(leftPersonStart)
      );
      const rightNumbers = Array.from(
        { length: rightPersonDiff + 1 },
        (_, i) => i + parseInt(rightPersonStart)
      );

      return type === 'a' ? containsAll(leftNumbers, rightNumbers) : containsAtAll(leftNumbers, rightNumbers);
    })
    .filter(Boolean).length;
};

const sumA = getOutput(pairs, 'a');
const sumB = getOutput(pairs, 'b');

console.log({ sumA });
console.log({ sumB });
//{ sumA: 571 }
