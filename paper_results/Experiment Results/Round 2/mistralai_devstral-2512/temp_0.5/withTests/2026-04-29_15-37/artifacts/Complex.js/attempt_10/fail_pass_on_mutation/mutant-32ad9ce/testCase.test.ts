// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with NaN values', () => {
  it('should handle single NaN component differently than double NaN', () => {
    const singleNaN = new Complex({ re: NaN, im: 0 });
    const doubleNaN = new Complex({ re: NaN, im: NaN });

    // In original code, both should be NaN
    expect(singleNaN.isNaN()).toBe(true);
    expect(doubleNaN.isNaN()).toBe(true);

    // In mutated code, singleNaN would not be NaN
    expect(singleNaN.re).toBe(NaN);
    expect(singleNaN.im).toBe(0);
  });
});