import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with real part = 1.5 and imaginary part = 0", () => {
    const c = new Complex(1.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.9624236501192069, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});