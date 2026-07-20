// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1fb1f37/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should use Taylor approximation for very small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses 1-x approximation for |x| < 1e-9
    // The mutated code always uses the general formula
    // For x=1e-10, the Taylor approximation (1-x) should be used
    // The general formula would give a different result
    expect(result.re).toBeCloseTo(1 - 1e-10, 10);
    expect(result.im).toBe(0);
  });
});