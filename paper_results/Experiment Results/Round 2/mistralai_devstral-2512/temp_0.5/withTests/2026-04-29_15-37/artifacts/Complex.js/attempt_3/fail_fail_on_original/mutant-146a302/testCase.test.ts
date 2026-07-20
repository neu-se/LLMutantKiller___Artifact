// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec(2+2i)", () => {
    const c = new Complex(2, 2);
    const result = c.sec();
    // The mutation changes Math.cos(2 * a) to Math.cos(2 / a)
    // For a=2, this becomes Math.cos(4) vs Math.cos(1)
    // cos(4) ≈ -0.6536436208636119
    // cos(1) ≈ 0.5403023058681398
    // This will produce significantly different results
    expect(result.re).toBeCloseTo(0.1499, 4);
    expect(result.im).toBeCloseTo(-0.2026, 4);
  });
});