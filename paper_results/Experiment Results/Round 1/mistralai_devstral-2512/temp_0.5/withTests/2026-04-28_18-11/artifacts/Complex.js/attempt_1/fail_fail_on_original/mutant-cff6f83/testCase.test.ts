// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The expected result is derived from the formula: acsch(z) = asinh(1/z)
    // For z = 1 + i, 1/z = (1 - i)/2
    // asinh((1 - i)/2) should be computed and compared
    const expected = new Complex(0.48121182505960347, -0.48121182505960347);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});