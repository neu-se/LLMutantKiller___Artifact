// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the case where the real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBe(Infinity);
  });
});