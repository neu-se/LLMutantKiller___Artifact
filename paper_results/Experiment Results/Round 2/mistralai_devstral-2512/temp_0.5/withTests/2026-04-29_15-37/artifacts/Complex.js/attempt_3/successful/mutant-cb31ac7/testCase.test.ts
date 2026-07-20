// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cb31ac7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test the cosm1 function directly through expm1 which uses it
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For purely imaginary numbers, expm1(0 + xi) = cosm1(x) + i*sin(x)
    // So the real part should be cosm1(x) = cos(x) - 1
    const expectedReal = Math.cos(x) - 1;
    // The mutation changes the sign of the last term in the Taylor series
    // which will make the result significantly different for small x
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});