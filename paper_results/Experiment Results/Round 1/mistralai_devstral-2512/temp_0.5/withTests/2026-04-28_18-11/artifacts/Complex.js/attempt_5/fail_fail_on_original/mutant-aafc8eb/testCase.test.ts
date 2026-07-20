// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x within Taylor series range", () => {
    // Test with a value within the Taylor series range (-π/4 ≤ x ≤ π/4)
    const x = Math.PI / 8; // 0.3927, well within the range
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cos(x) - 1
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});