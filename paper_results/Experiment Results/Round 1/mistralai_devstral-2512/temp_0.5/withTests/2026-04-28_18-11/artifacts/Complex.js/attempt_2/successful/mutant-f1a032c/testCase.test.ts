// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f1a032c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.floor", () => {
  it("should correctly floor the real part of a complex number", () => {
    const c = new Complex(3.7, 2.3);
    const result = c.floor();
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});