// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec for complex numbers with specific real parts", () => {
    const c = new Complex(2, 1);
    const result = c.sec();
    // The mutation changes Math.cos(2*a) to Math.cos(2/a)
    // For a=2, this creates a significant difference in the denominator
    // Original: d = 0.5 * cosh(2) + 0.5 * Math.cos(4)
    // Mutated: d = 0.5 * cosh(2) + 0.5 * Math.cos(1)
    const cosh = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };
    const sinh = Math.sinh || function(x) {
      return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    };
    const expectedRe = Math.cos(2) * cosh(1) / (0.5 * cosh(2) + 0.5 * Math.cos(4));
    const expectedIm = Math.sin(2) * sinh(1) / (0.5 * cosh(2) + 0.5 * Math.cos(4));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});