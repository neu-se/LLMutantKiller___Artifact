// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should fail when imaginary part is accessed incorrectly due to mutation", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which should produce NaN
    // when trying to access an undefined property
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});