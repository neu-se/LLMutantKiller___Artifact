// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-27899a0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle the case where real part is -1 and imaginary part is 0", () => {
    const c = new Complex(-1, 0);
    const result = c.atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});