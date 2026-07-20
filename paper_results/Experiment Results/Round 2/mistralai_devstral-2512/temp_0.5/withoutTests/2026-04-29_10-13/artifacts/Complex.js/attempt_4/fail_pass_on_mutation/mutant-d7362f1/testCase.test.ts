// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers and return a real result", () => {
    const a = new Complex(5, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(15);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(false);
  });
});