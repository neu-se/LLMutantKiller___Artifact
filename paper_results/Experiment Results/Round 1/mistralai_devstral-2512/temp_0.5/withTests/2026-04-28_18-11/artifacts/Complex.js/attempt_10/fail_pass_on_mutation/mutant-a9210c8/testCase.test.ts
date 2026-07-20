// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c1 = new Complex(0.5, 0.5);
    const c2 = new Complex(0.5, 0.5);
    const result1 = c1.sech();
    const result2 = c2.sech();
    // The mutation changes this['im'] to this[""] which will cause inconsistent results
    // between identical inputs due to undefined behavior
    expect(result1.re).toBeCloseTo(result2.re, 10);
    expect(result1.im).toBeCloseTo(result2.im, 10);
  });
});