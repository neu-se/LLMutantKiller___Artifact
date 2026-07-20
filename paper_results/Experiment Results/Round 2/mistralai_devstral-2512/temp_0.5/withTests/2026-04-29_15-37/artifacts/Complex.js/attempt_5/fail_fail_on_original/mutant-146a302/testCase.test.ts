// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-146a302/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute sec(0.5+0.5i)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sec();
    // The mutation changes Math.cos(2*a) to Math.cos(2/a)
    // For a=0.5, this becomes Math.cos(1) vs Math.cos(4)
    // cos(1) ≈ 0.5403023058681398
    // cos(4) ≈ -0.6536436208636119
    // This will produce different results
    expect(result.re).toBeCloseTo(0.9499788676154947, 10);
    expect(result.im).toBeCloseTo(-0.2306350203210303, 10);
  });
});