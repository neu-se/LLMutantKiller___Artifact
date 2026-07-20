// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which should produce different results
    // We test for the exact expected values from the original implementation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.5493061443340548);
  });
});