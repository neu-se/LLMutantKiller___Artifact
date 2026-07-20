// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd04d59/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The expected result is computed based on the mathematical definition:
    // asinh(1 + i) = ln(1 + i + sqrt((1 + i)^2 + 1))
    // We can verify the result by checking if sinh(asinh(z)) == z
    const sinhOfResult = result.sinh();
    expect(sinhOfResult.re).toBeCloseTo(c.re, 10);
    expect(sinhOfResult.im).toBeCloseTo(c.im, 10);
  });
});