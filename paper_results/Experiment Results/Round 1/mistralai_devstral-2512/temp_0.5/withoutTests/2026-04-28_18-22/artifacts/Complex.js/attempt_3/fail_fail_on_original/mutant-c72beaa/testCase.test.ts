import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should correctly compute acot for complex number with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});