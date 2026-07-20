// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should handle the boundary case where real part is exactly 0 and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(1));
    expect(result.im).toBeCloseTo(Math.PI/2);
  });
});