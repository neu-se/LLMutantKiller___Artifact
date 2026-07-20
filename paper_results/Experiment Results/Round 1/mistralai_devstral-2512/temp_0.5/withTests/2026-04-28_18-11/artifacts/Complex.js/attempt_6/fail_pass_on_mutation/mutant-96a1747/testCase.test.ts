// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-96a1747/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a complex number with non-zero real part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes x['im'] = -x['im'] to x['im'] = -x[""]
    // This will cause the imaginary part calculation to be incorrect
    // We check that the result is a valid complex number (not NaN)
    expect(typeof result.im).toBe('number');
    expect(typeof result.re).toBe('number');
    expect(isNaN(result.im)).toBe(false);
    expect(isNaN(result.re)).toBe(false);
  });
});