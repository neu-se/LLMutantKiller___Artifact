// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the sign in the Taylor series approximation of cosm1
    // We test with a very small x value where the Taylor series is used
    const x = 0.001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part of expm1(x+0i) should be expm1(x)*cos(0) + (cos(x)-1)
    // Since cos(0) = 1, this simplifies to expm1(x) + (cos(x)-1)
    // We test the difference between the actual and expected value
    const expectedReal = Math.expm1(x) + (Math.cos(x) - 1);
    const difference = Math.abs(result.re - expectedReal);
    // The difference should be very small (within floating point precision)
    expect(difference).toBeLessThan(1e-8);
    expect(result.im).toBeCloseTo(0, 10);
  });
});