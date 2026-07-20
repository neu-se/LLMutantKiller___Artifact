// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd04d59/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The expected result is computed based on the mathematical definition:
    // asinh(1 + i) = ln(1 + i + sqrt((1 + i)^2 + 1))
    // The real part should be approximately 0.614938542 and the imaginary part approximately 0.5235987756
    expect(result.re).toBeCloseTo(0.614938542, 6);
    expect(result.im).toBeCloseTo(0.5235987756, 6);
  });
});