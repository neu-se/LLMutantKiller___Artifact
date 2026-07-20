// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the sign in the Taylor series approximation of cosm1
    // We test with a small x value where the Taylor series is used
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part of expm1(x+0i) should be expm1(x)*cos(0) + (cos(x)-1)
    // Since cos(0) = 1, this simplifies to expm1(x) + (cos(x)-1)
    // We test the specific value of cos(x)-1 which is affected by the mutation
    const cosm1_value = result.re - Math.expm1(x);
    const expected_cosm1 = Math.cos(x) - 1;
    // The difference should be very small (within floating point precision)
    expect(Math.abs(cosm1_value - expected_cosm1)).toBeLessThan(1e-10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});