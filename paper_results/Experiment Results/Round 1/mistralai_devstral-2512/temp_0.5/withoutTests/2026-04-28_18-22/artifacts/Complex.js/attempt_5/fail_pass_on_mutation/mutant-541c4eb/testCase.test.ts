// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle the asinh calculation for complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // This will cause the real and imaginary parts to be swapped in the result
    // We test that the real part is not equal to the imaginary part
    expect(result.re).not.toBe(result.im);
    // Also verify the result is a valid complex number
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});