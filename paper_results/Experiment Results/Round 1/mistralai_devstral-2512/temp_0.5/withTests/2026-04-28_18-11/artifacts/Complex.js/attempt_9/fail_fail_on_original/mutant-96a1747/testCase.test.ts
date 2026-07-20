// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-96a1747/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a complex number with non-zero real part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes x['im'] = -x['im'] to x['im'] = -x[""]
    // This will cause the imaginary part to become NaN, making the result invalid
    // We check that the imaginary part is exactly what we expect from the correct calculation
    const expectedIm = 0.5 * Math.atan2(0.5, 0.5);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});