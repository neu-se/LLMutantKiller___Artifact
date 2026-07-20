// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // This will cause different behavior when the imaginary part is non-zero
    expect(result.re).toBeCloseTo(0.6614793638886048, 10);
    expect(result.im).toBeCloseTo(1.0612750619050357, 10);
  });
});