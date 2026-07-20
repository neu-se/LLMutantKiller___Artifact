// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should handle the special case where real part is positive and imaginary part is zero", () => {
    const c = new Complex(2, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBe(0);
  });
});