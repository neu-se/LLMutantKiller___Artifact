import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a purely real number", () => {
    const c = new Complex(1, 0);
    const result = c.csch();
    expect(result.re).toBeCloseTo(0.8509181282393216, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});