// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fac1911/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case where a=0 and b=1", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The mutation (a/a) would cause division by zero when a=0
    // This should produce Infinity in the real part for the original code
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});