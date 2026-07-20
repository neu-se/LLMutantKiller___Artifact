// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec(1 + 1i)", () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    // Expected result calculated using the correct formula:
    // d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a)
    // For a=1, b=1:
    // d = 0.5 * cosh(2) + 0.5 * cos(2)
    const expectedRe = Math.cos(1) * Math.cosh(1) / (0.5 * Math.cosh(2) + 0.5 * Math.cos(2));
    const expectedIm = Math.sin(1) * Math.sinh(1) / (0.5 * Math.cosh(2) + 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});