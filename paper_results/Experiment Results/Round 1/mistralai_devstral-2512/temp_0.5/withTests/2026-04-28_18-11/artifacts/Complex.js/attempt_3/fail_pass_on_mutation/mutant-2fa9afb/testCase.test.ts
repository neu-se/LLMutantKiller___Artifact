// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return a valid Complex object for non-zero inputs", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    expect(result).toBeInstanceOf(Complex);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});