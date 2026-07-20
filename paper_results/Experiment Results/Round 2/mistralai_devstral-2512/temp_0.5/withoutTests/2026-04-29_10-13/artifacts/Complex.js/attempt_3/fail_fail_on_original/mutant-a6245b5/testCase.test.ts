// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the case where real part is -1 and imaginary part is 0", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});