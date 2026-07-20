// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1fb1f37/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should correctly compute cosh for very small values using Taylor approximation", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses Taylor approximation for small values (1-x)
    // The mutated code always uses the general formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // For very small x, these should differ significantly
    expect(result.re).toBeCloseTo(1 - 0.5 * (1e-10) * (1e-10), 15);
    expect(result.im).toBe(0);
  });
});