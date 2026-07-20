// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for negative values", () => {
    const z = new Complex(-1, 0);
    const result = z.cosh();
    // The original implementation uses Math.exp(x) + Math.exp(-x)
    // The mutated version uses Math.exp(x) + Math.exp(+x) which is equivalent to 2*Math.exp(x)
    // For x=-1: correct cosh(-1) = (e^-1 + e^1)/2 ≈ 1.5430806348152437
    // Mutated version would give (e^-1 + e^-1)/2 = e^-1 ≈ 0.36787944117144233
    expect(result.re).toBeCloseTo(1.5430806348152437, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});