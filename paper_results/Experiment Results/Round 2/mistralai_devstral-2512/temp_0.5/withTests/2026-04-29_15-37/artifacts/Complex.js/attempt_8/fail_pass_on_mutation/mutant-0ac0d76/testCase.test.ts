// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log()", () => {
  it("should correctly handle the special case of b === 0 and a > 0", () => {
    const c = new Complex(1, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(0);
  });
});