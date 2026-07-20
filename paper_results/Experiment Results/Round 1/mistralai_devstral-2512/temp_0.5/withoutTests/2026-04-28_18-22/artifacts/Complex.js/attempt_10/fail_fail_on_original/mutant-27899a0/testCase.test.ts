// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-27899a0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return 0 when real part is -1 and imaginary part is 0", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});