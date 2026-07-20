// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-069e426/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should trigger the special case when real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Math.PI / 2);
  });
});