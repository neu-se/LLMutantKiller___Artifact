// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for negative values", () => {
    const z = new Complex(-1, 0);
    const result = z.cosh();
    const expected = new Complex((Math.exp(-1) + Math.exp(1)) * 0.5, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});