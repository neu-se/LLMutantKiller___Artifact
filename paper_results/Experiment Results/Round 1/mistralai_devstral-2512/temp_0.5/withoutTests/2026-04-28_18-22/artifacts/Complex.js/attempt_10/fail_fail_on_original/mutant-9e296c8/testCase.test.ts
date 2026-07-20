import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 1 and imaginary part 2", () => {
    const c = new Complex(1, 2);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.14857142857142858, 10);
    expect(result.im).toBeCloseTo(0.29714285714285715, 10);
  });
});