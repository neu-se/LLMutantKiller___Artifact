// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec(1+1i)", () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    // Expected result calculated using the correct formula:
    // d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a)
    // For a=1, b=1:
    // d = 0.5 * cosh(2) + 0.5 * cos(2)
    // cosh(2) ≈ 3.7621956910836314
    // cos(2) ≈ -0.4161468365471424
    // d ≈ 0.5 * 3.7621956910836314 + 0.5 * -0.4161468365471424 ≈ 1.6730244272682445
    // Expected real part: cos(1) * cosh(1) / d ≈ 0.5403023058681398 * 1.5430806348152437 / 1.6730244272682445 ≈ 0.50485
    // Expected imaginary part: -sin(1) * sinh(1) / d ≈ -0.8414709848078965 * 1.1752011936438014 / 1.6730244272682445 ≈ -0.5705
    expect(result.re).toBeCloseTo(0.50485, 4);
    expect(result.im).toBeCloseTo(-0.5705, 4);
  });
});