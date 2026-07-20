// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh for small values", () => {
    // This test targets the mutation in the cosh function
    // The mutation changes `||` to `&&` in the fallback implementation
    // When Math.cosh is available, the original uses it, the mutant uses the fallback
    // When Math.cosh is not available, the original uses the fallback, the mutant returns undefined

    // Create a complex number that will use cosh in its calculations
    const c = new Complex(0, 0.0000001); // Very small imaginary part

    // The sinh function internally uses cosh, which will trigger our mutation
    const result = c.sinh();

    // For x = 0.0000001, cosh(x) ≈ 1 - x (from the fallback implementation)
    // sinh(x) = (e^x - e^-x)/2 ≈ x when x is small
    // So sinh(0.0000001i) should be approximately [0, 0.0000001]
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.0000001, 10);
  });
});