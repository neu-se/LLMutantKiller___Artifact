// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle the mutation by detecting invalid property access", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which should produce different results
    // when the imaginary part is non-zero
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    // The exact values will differ between original and mutated versions
    const originalRe = 1.0612750619050357;
    const originalIm = -0.5493061443340548;
    // This should pass on original but fail on mutated version
    expect(result.re).toBeCloseTo(originalRe, 5);
    expect(result.im).toBeCloseTo(originalIm, 5);
  });
});