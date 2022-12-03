const text = await Deno.readTextFile("./input.txt");

const strategyLines = text.split("\n").filter((line) => line.length > 0);

const POINTS_BY_TYPE = {
  X: 1,
  ROCK: 1,
  Y: 2,
  PAPER: 2,
  Z: 3,
  SCISSORS: 3,
} as const;

const POINTS_BY_RESULT = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
} as const;

type MOVES = "ROCK" | "PAPER" | "SCISSORS";
type FAKE_MOVES = "X" | "Y" | "Z";
type OPPONENT_MOVES = "A" | "B" | "C";

const GAME_INFO = {
  //ROCK
  A: {
    sameAs: ["ROCK", "X"],
    beats: ["SCISSORS", "Z"],
    beatenBy: ["PAPER", "Y"],
  },
  B: {
    sameAs: ["PAPER", "Y"],
    beats: ["ROCK", "X"],
    beatenBy: ["SCISSORS", "Z"],
  },
  C: {
    sameAs: ["SCISSORS", "Z"],
    beats: ["PAPER", "Y"],
    beatenBy: ["ROCK", "X"],
  },
  POINTS: {
    BY_TYPE: POINTS_BY_TYPE,
    BY_RESULT: POINTS_BY_RESULT,
  },
  RESULT: {
    Z: "WIN",
    Y: "DRAW",
    X: "LOSS",
  } as const,
};

type ValueOf<T> = T[keyof T];

// 1/2

const outputOne = strategyLines.reduce((acc, line) => {
  const [opponent, myself] = line.split(" ") as [OPPONENT_MOVES, FAKE_MOVES];

  const pointForType = GAME_INFO.POINTS.BY_TYPE[myself];

  if (GAME_INFO[opponent].beatenBy[1] === myself) {
    acc += GAME_INFO.POINTS.BY_RESULT.WIN + pointForType;
    return acc;
  }
  if (GAME_INFO[opponent].sameAs[1] === myself) {
    acc += GAME_INFO.POINTS.BY_RESULT.DRAW + pointForType;
    return acc;
  }

  acc += POINTS_BY_RESULT.LOSS + pointForType;
  return acc;
}, 0);

console.log({ outputOne });

// 2/2

const outputTwo = strategyLines.reduce((acc, line) => {
  const [opponent, result] = line.split(" ") as [OPPONENT_MOVES, FAKE_MOVES];

  if (GAME_INFO.RESULT[result] === "WIN") {
    const move = GAME_INFO[opponent].beatenBy[0] as MOVES;
    acc += GAME_INFO.POINTS.BY_RESULT.WIN + GAME_INFO.POINTS.BY_TYPE[move];
    return acc;
  }

  if (GAME_INFO.RESULT[result] === "DRAW") {
    const move = GAME_INFO[opponent].sameAs[0] as MOVES;
    acc += GAME_INFO.POINTS.BY_RESULT.DRAW + GAME_INFO.POINTS.BY_TYPE[move];
    return acc;
  }

  const move = GAME_INFO[opponent].beats[0] as MOVES;
  acc += GAME_INFO.POINTS.BY_RESULT.LOSS + GAME_INFO.POINTS.BY_TYPE[move];
  return acc;
}, 0);

console.log({ outputTwo });

// { outputOne: 14297 }
// { outputTwo: 10498 }
