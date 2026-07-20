import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 2", () => {
    const c = new Complex(2, 1);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.13917310096006543, 10);
    expect(result.im).toBeCloseTo(0.4187655219255708, 10);
  });
});