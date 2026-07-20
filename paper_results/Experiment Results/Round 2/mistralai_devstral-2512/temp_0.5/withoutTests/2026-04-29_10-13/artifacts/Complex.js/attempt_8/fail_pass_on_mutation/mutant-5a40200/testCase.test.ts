// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use exponential formula for values at exactly 1e-9", () => {
    const z = new Complex(1e-9, 0); // Exactly at the threshold
    const result = z.cosh();

    // Original: uses exponential formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // Mutated: uses Taylor approximation 1 - x
    // For x = 1e-9:
    // Exponential: ≈ 1.0000000000005
    // Taylor: 1 - 1e-9 = 0.999999999

    // The original should give us a value very close to 1 (exponential formula)
    // The mutated would give us 0.999999999 (Taylor approximation)
    expect(result.re).toBeGreaterThan(0.9999999999);
    expect(result.re).toBeLessThan(1.000000000001);
    expect(result.im).toBeCloseTo(0, 12);
  });
});