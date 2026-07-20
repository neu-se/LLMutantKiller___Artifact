// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-04a68d5/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    // The sech of 1 should be 1/cosh(1)
    const expectedRe = 1 / Math.cosh(1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(0);
  });
});