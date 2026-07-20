// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should use the correct formula for values just below 1e-9", () => {
    const z = new Complex(0.999999999e-9, 0);
    const result = z.cosh();
    // Original code uses 1-x for |x| < 1e-9 (incorrect)
    // Mutant code uses the correct formula for |x| < 1e-9
    // We test that the result matches the correct mathematical value
    const expected = (Math.exp(0.999999999e-9) + Math.exp(-0.999999999e-9)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 15);
    expect(result.im).toBe(0);
  });
});