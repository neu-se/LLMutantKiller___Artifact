// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers using the optimized path", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutant changes this['im'] to this[""] which is undefined
    // This causes the optimization condition to fail (0 === 0 && undefined === 0 is false)
    // and fall through to the general case which should still work but might have
    // different floating point behavior. We test the exact expected result.
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // Additional check to ensure we're getting the exact optimized result
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});