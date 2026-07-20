// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with real=1, imag=2", () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    // The mutation changes a/d to a*d in the acsch calculation
    // This test verifies the correct division behavior
    expect(result.re).toBeCloseTo(0.22996, 4);
    expect(result.im).toBeCloseTo(-0.40276, 4);
  });
});