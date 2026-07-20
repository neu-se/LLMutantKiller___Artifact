// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should use the 1-x approximation for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // Original code uses 1-x for |x| < 1e-9
    // Mutant code uses 1-x for |x| >= 1e-9
    // We test that the original behavior (1-x) is used for small values
    expect(result.re).toBeCloseTo(1 - 1e-10, 15);
    expect(result.im).toBe(0);
  });
});