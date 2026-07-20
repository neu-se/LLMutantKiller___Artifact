// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return a finite result for finite inputs", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    expect(result.isFinite()).toBe(true);
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});