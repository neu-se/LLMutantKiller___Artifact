// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes the condition from (b !== 0) to (false)
    // This should cause different behavior when b is not 0
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});