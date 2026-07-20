import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should produce correct results for asech with non-zero imaginary component", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // These values are calculated from the original implementation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
  });
});