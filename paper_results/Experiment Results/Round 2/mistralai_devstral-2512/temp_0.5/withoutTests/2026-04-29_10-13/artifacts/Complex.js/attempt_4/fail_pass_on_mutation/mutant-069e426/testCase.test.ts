// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-069e426/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should correctly handle the special case when both real and imaginary parts are zero", () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});