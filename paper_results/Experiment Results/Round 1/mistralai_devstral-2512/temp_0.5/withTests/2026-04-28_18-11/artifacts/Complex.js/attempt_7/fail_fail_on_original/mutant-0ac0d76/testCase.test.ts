// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should handle boundary case where real part is exactly 0 and imaginary part is 0", () => {
    const c = new Complex(0, 0);
    const result = c.log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(NaN);
  });
});