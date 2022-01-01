import puzzle from "../../types/puzzle";

const orangeTan = "#EECA83";
const sand = "#DCD385";
const oliveBrown = "#C5C03C";
const orange = "#F2AE32";
const brown = "#8A622B";

export const puzzles: puzzle[] = [
  [
    { isCorrect: true, color: "yellow" },
    { isCorrect: true, color: "yellow" },

    { isCorrect: true, color: "yellow" },
    { isCorrect: false },
  ],
  [
    { isCorrect: false },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },

    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },

    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: false },
    { isCorrect: true, color: "cornflowerblue" },
  ],
  [
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: "peru" },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "peru" },
    { isCorrect: true, color: "red" },
    { isCorrect: false },

    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },

    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: false },
    { isCorrect: true, color: "red" },

    { isCorrect: false },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: true, color: "red" },
    { isCorrect: false },
  ],
  [
    { isCorrect: false },
    { isCorrect: true, color: "gold" },
    { isCorrect: true, color: "gold" },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: true, color: "khaki" },
    { isCorrect: false },
    { isCorrect: true, color: "khaki" },
    { isCorrect: true, color: "khaki" },
    { isCorrect: false },

    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: true, color: "lemonchiffon" },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: true, color: "gainsboro" },
    { isCorrect: true, color: "gainsboro" },
    { isCorrect: false },
    { isCorrect: false },
  ],
  [
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: "cadetblue" },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: true, color: "cadetblue" },
    { isCorrect: false },
    { isCorrect: true, color: "cadetblue" },
    { isCorrect: false },

    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "grey" },

    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: true, color: "cornflowerblue" },
    { isCorrect: false },
    { isCorrect: true, color: "grey" },
    { isCorrect: true, color: "grey" },

    { isCorrect: true, color: "grey" },
    { isCorrect: true, color: "grey" },
    { isCorrect: true, color: "grey" },
    { isCorrect: true, color: "grey" },
    { isCorrect: true, color: "grey" },
  ],
  [
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },

    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: "blue" },
  ],
  [
    // 1
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: orangeTan },
    { isCorrect: true, color: orangeTan },
    { isCorrect: true, color: orangeTan },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },

    //2
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: orangeTan },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },
    { isCorrect: false },
    { isCorrect: false },

    //3
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: orangeTan },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: sand },
    { isCorrect: false },

    //4
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: orangeTan },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: sand },

    //5
    { isCorrect: true, color: sand },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: brown },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },

    // 6
    { isCorrect: true, color: sand },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: sand },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },

    //7
    { isCorrect: true, color: sand },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },

    //8
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: orange },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: orange },
    { isCorrect: true, color: brown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },
    { isCorrect: false },

    //9
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: oliveBrown },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: sand },
    { isCorrect: false },

    //10
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: false },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: sand },
    { isCorrect: true, color: sand },
    { isCorrect: false },
    { isCorrect: false },
  ],
];
