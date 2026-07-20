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
    // We need to check if the result is exactly 1-x (Taylor) or the general formula
    // The difference between the two approaches should be detectable
    const expectedTaylor = 1 - 1e-10;
    const expectedGeneral = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;
    // The original should be closer to Taylor, mutated to general
    const diffToTaylor = Math.abs(result.re - expectedTaylor);
    const diffToGeneral = Math.abs(result.re - expectedGeneral);
    // Original code should be much closer to Taylor approximation
    // Using a threshold to account for floating point precision
    expect(diffToTaylor).toBeLessThan(1e-15);
    expect(result.im).toBe(0);
  });
});