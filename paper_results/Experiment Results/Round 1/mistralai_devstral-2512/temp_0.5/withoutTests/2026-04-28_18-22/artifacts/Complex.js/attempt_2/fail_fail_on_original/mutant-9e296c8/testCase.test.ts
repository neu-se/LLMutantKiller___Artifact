import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with non-zero real part", () => {
    const c = new Complex(1, 1);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.3181315052047641, 10);
    expect(result.im).toBeCloseTo(0.6681786379192988, 10);
  });
});