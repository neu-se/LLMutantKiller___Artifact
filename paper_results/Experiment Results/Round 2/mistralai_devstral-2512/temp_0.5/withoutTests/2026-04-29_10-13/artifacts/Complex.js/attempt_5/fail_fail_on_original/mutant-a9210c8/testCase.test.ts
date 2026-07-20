import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce correct results for complex numbers with non-zero imaginary component", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation will cause the imaginary part to be read as undefined
    // This should produce different results between original and mutated code
    expect(result.re).toBeCloseTo(0.5, 4);
    expect(result.im).toBeCloseTo(-0.5, 4);
  });
});