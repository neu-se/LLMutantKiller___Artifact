// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch() with zero real and non-zero imaginary component", () => {
  it("should return the correct sign for the imaginary part when b !== 0", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The mutation changes -b/0 to +b/0 which affects the intermediate calculation
    // This should be observable in the final result's imaginary component
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});