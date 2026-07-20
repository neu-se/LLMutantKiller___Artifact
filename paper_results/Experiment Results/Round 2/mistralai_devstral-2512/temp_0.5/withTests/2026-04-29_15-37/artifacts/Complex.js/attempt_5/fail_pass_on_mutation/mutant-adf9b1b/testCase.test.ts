// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-adf9b1b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for small x values using expm1", () => {
    // Test with a small value where Taylor series approximation should be used
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be expm1(x)*cos(0) + cosm1(0) = expm1(x) + (cos(0)-1)
    // Since cos(0) = 1, this simplifies to expm1(x)
    const expectedReal = Math.expm1(x);
    // Allow for small floating point differences
    expect(Math.abs(result.re - expectedReal)).toBeLessThan(1e-10);
  });
});