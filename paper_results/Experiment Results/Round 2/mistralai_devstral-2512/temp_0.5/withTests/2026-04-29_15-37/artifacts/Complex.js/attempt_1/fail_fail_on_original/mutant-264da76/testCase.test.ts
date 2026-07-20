// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-264da76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which would drastically change the result
    // For c = 2 + 3i, the correct result should be approximately 0.1469 + 0.2206i
    expect(result.re).toBeCloseTo(0.1469, 4);
    expect(result.im).toBeCloseTo(0.2206, 4);
  });
});