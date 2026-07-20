// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute csc for a complex number with non-zero real part", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // Expected result calculated from original formula: d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a)
    // For a=1, b=1: d = 0.5 * cosh(2) - 0.5 * cos(2)
    const expectedRe = Math.sin(1) * cosh(1) / (0.5 * cosh(2) - 0.5 * Math.cos(2));
    const expectedIm = -Math.cos(1) * sinh(1) / (0.5 * cosh(2) - 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});