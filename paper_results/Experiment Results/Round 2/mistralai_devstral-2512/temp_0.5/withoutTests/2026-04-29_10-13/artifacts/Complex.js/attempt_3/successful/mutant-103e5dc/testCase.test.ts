// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute csc for a complex number with real part 0.5", () => {
    const c = new Complex(0.5, 1);
    const result = c.csc();
    // With original code: d = 0.5 * cosh(2) - 0.5 * Math.cos(1)
    // With mutated code: d = 0.5 * cosh(2) - 0.5 * Math.cos(2) (since 2/a = 2/0.5 = 4)
    // These will produce different results
    const expectedReOriginal = Math.sin(0.5) * Math.cosh(1) / (0.5 * Math.cosh(2) - 0.5 * Math.cos(1));
    const expectedImOriginal = -Math.cos(0.5) * Math.sinh(1) / (0.5 * Math.cosh(2) - 0.5 * Math.cos(1));
    expect(result.re).toBeCloseTo(expectedReOriginal, 10);
    expect(result.im).toBeCloseTo(expectedImOriginal, 10);
  });
});