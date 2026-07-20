// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3396602/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute csc for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The original implementation uses subtraction, while the mutant uses division
    // For x=1, cos(2) ≈ -0.4161468365471424
    // Original: 0.5 * cosh(2) - 0.5 * cos(2) ≈ 0.5 * 3.7621956910836314 - 0.5 * (-0.4161468365471424) ≈ 1.8810978455418157 + 0.2080734182735712 ≈ 2.0891712638153869
    // Mutant: 0.5 * cosh(2) - 0.5 / cos(2) ≈ 0.5 * 3.7621956910836314 - 0.5 / (-0.4161468365471424) ≈ 1.8810978455418157 + 1.2014087502620896 ≈ 3.0825065958039053
    // This difference will propagate to the final result
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.30393100162842646, 10);
  });
});