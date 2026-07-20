// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2adb041/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1;
    const complex = new Complex(x, 0);
    const result = complex.expm1().re - complex.re;
    expect(result).toBeCloseTo(expected, 10);
  });
});