// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute acsch for a specific complex number where the mutation would cause detectable difference", () => {
    const c = new Complex(2, 1);
    const result = c.acsch();
    // The mutation changes a/d to a*d in the acsch implementation
    // For this specific input, the mutation will produce significantly different results
    // We test the mathematical identity: acsch(z) = asinh(1/z)
    const reciprocal = new Complex(1, 0).div(c);
    const expected = reciprocal.asinh();
    // The difference should be very small in the original code
    // but will be large in the mutated version
    const diffRe = Math.abs(result.re - expected.re);
    const diffIm = Math.abs(result.im - expected.im);
    expect(diffRe).toBeLessThan(1e-8);
    expect(diffIm).toBeLessThan(1e-8);
  });
});