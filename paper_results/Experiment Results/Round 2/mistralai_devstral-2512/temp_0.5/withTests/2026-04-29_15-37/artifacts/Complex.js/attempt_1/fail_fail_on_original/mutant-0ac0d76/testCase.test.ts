// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.log()", () => {
  it("should correctly compute the natural logarithm of a positive real number", () => {
    const c = new Complex(2, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBe(0);
  });
});