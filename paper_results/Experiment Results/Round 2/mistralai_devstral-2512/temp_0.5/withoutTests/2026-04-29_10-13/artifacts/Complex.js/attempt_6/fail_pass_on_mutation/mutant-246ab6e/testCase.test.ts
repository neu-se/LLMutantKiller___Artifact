// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values using Taylor approximation", () => {
    const z = new Complex(0.1, 0);
    const result = z.cosh();
    // For small x, cosh(x) ≈ 1 + x²/2 + x⁴/24
    // x = 0.1: 1 + 0.005 + 0.0000041667 ≈ 1.0050041667
    // The mutation would give (e^0.1 + e^0.1)/2 = e^0.1 ≈ 1.105170918
    expect(result.re).toBeCloseTo(1.0050041667, 6);
    expect(result.im).toBeCloseTo(0, 10);
  });
});