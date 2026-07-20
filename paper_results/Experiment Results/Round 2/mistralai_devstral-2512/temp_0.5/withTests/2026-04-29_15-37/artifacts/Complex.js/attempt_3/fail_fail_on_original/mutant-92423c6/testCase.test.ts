// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the sign in the Taylor series approximation of cosm1
    // This test directly tests the cosm1 function through expm1 which uses it
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part of expm1(x+0i) should be expm1(x)*cos(0) + (cos(x)-1)
    // Since cos(0) = 1, this simplifies to expm1(x) + (cos(x)-1)
    // The mutation changes the sign in the Taylor series, affecting cos(x)-1
    const expectedReal = Math.expm1(x) + (Math.cos(x) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});