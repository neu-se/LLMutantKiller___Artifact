// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9e296c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch() mutation test", () => {
  it("should correctly compute csch for a complex number with real part 2", () => {
    const c = new Complex(2, 0.5);
    const result = c.csch();
    // For a=2, b=0.5:
    // Original: d = cos(1) - cosh(4) ≈ 0.5403 - 27.3082 ≈ -26.7679
    // Mutated: d = cos(1) - cosh(1) ≈ 0.5403 - 1.5431 ≈ -1.0028
    // This will produce different results
    expect(result.re).toBeCloseTo(0.2378, 4);
    expect(result.im).toBeCloseTo(0.0000, 4);
  });
});