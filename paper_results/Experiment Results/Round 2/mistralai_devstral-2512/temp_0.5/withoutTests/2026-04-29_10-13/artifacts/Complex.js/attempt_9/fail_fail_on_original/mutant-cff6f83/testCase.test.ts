import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with real part 0.5 and imaginary part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsch();
    // This test verifies the specific calculation path affected by the mutation
    // The mutation changes a/d to a*d in the acsch calculation
    expect(result.re).toBeCloseTo(0.6931, 4);
    expect(result.im).toBeCloseTo(-0.6931, 4);
  });
});