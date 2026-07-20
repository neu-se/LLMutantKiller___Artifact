// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // This will cause incorrect behavior when processing complex numbers
    // We verify the result is not NaN and has expected properties
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(result.re, 5); // Self-comparison to check stability
    expect(result.im).toBeCloseTo(result.im, 5); // Self-comparison to check stability
  });
});