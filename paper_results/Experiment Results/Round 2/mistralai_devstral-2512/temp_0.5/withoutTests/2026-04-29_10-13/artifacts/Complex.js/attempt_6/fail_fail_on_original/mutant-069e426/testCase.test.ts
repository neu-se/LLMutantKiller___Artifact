// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-069e426/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should handle division by zero correctly when real part is zero", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});