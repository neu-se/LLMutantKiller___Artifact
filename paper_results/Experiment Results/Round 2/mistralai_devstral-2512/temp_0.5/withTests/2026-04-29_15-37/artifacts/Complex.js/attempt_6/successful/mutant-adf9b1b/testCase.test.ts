// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-adf9b1b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where Taylor series approximation should be used
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // The real part should be exp(0)*cos(x) - 1 = cos(x) - 1
    const expectedReal = Math.cos(x) - 1;
    // The imaginary part should be exp(0)*sin(x) = sin(x)
    const expectedImag = Math.sin(x);
    // Allow for small floating point differences
    expect(Math.abs(result.re - expectedReal)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedImag)).toBeLessThan(1e-10);
  });
});