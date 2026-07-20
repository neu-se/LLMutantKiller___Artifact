// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small imaginary values", () => {
    // Test with a small imaginary value where cosm1 should be used
    const y = 0.1;
    const c = new Complex(0, y);
    const result = c.expm1();
    // For exp(i*y) - 1 = cos(y) - 1 + i*sin(y)
    // The real part should be cosm1(y)
    const expectedReal = Math.cos(y) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 15);
  });
});