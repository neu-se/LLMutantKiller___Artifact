// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should not return Infinity for finite inputs", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.isFinite()).toBe(true);
    expect(result.isInfinite()).toBe(false);
  });
});