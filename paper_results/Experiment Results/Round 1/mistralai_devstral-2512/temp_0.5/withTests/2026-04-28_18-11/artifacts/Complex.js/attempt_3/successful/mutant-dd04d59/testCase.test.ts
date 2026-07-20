// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd04d59/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    // The expected result is computed based on the mathematical definition:
    // asinh(i) = i * π / 2
    // The real part should be approximately 0 and the imaginary part approximately π/2
    expect(result.re).toBeCloseTo(0, 6);
    expect(result.im).toBeCloseTo(Math.PI / 2, 6);
  });
});