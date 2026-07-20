// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c49511e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The expected result is computed based on the formula for csc(z)
    // csc(z) = 1 / sin(z)
    // For z = 1 + i, sin(z) = sin(1)cosh(1) + i cos(1)sinh(1)
    // So csc(z) = 1 / (sin(1)cosh(1) + i cos(1)sinh(1))
    // We can compute this using the inverse method for verification
    const sinZ = c.sin();
    const expected = sinZ.inverse();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});