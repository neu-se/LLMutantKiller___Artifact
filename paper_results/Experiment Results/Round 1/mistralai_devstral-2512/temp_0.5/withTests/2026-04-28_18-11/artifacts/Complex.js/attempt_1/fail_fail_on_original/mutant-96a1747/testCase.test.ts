// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-96a1747/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a complex number with non-zero real part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // Expected result computed using the correct formula
    const expectedRe = 0.25 * Math.log((1 + 0.5) / (1 - 0.5)) + 0.25 * Math.atan2(0.5, 0.5);
    const expectedIm = 0.25 * Math.log((1 + 0.5) / (1 - 0.5)) - 0.25 * Math.atan2(0.5, 0.5);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});