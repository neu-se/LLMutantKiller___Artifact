// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero components", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsch();
    // The mutation changes a/d to a*d in the acsch implementation
    // This test verifies the relationship between acsch and asinh
    // acsch(z) should equal asinh(1/z)
    const expected = new Complex(1, 1).div(c).asinh();
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-10);
  });
});