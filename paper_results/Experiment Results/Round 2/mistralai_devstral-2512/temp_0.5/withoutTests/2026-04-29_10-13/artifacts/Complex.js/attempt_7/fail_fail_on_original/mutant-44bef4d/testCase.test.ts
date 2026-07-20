// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-44bef4d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes -b/d to -b*d in the acsc calculation
    // This test verifies the exact relationship between input and output
    const expectedRe = 0.6662394324925153;
    const expectedIm = -0.6662394324925153;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});