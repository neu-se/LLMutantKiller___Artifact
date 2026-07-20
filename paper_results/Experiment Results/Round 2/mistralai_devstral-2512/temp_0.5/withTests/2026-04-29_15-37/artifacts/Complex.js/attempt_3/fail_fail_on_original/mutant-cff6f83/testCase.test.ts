// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cff6f83/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    // The mutation changes a/d to a*d in the acsch implementation
    // This test verifies the correct behavior by checking against known values
    expect(result.re).toBeCloseTo(0.157356, 5);
    expect(result.im).toBeCloseTo(-0.223406, 5);
  });
});