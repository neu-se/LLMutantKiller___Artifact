// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle edge case where real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.isFinite()).toBe(true);
    expect(result.re).not.toBe(Infinity);
    expect(result.re).not.toBe(-Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(result.im).not.toBe(-Infinity);
  });
});