import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 2 and imaginary part 2", () => {
    const c = new Complex(2, 2);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.0917553211538185, 10);
    expect(result.im).toBeCloseTo(0.0917553211538185, 10);
  });
});