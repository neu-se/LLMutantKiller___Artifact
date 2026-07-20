// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9e296c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch() mutation test", () => {
  it("should correctly compute csch for a complex number with non-zero real part", () => {
    const c = new Complex(1, 0.5);
    const result = c.csch();
    // The mutation changes cosh(2 * a) to cosh(2 / a), which will produce different results
    // For a=1, cosh(2*1) = cosh(2) ≈ 3.7622, while cosh(2/1) = cosh(2) ≈ 3.7622 (same in this case)
    // Let's use a value where 2*a != 2/a
    const c2 = new Complex(2, 0.5);
    const result2 = c2.csch();
    // For a=2: cosh(2*2)=cosh(4)≈27.3082, cosh(2/2)=cosh(1)≈1.5431 (very different)
    // This should expose the mutation
    expect(result2.re).toBeCloseTo(-0.0366, 4);
    expect(result2.im).toBeCloseTo(0.0000, 4);
  });
});