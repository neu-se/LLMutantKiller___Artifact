// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec(0.5+0.5i)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sec();
    // Calculate expected values using the correct formula
    // d = 0.5 * cosh(2*b) + 0.5 * Math.cos(2*a)
    // For a=0.5, b=0.5:
    // cosh(1) ≈ 1.5430806348152437
    // cos(1) ≈ 0.5403023058681398
    // d ≈ 0.5 * 1.5430806348152437 + 0.5 * 0.5403023058681398 ≈ 1.0416914703391918
    // Expected real: cos(0.5) * cosh(0.5) / d ≈ 0.8775825618903728 * 1.1276259652063807 / 1.0416914703391918 ≈ 0.979
    // Expected imag: -sin(0.5) * sinh(0.5) / d ≈ -0.479425538604203 * 0.5210953054937474 / 1.0416914703391918 ≈ -0.237
    expect(result.re).toBeCloseTo(0.979, 3);
    expect(result.im).toBeCloseTo(-0.237, 3);
  });
});