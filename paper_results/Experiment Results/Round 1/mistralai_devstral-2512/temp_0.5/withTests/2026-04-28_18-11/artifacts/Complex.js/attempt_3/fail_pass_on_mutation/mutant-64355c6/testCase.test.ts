// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return a finite value when called on a non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.isFinite()).toBe(true);
  });
});